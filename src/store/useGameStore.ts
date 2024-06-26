import { RefObject, createRef } from "react";
import { Group, Vector3 } from "three";
import { create } from "zustand";
import { createAsteroids } from "../utils/createAsteroids";
import { Position } from "../utils/toPosition";
import { Rotation } from "../utils/toRotation";
import { createSpaceship } from "../utils/createSpaceship";
import { checkCollision } from "../utils/checkCollision";
import { useSceneStore } from "./useSceneStore";

const TIME_LASER_ACTIVE_IN_MS = 1 * 1000; // 1 second
const COOLDOWN_BETWEN_LASERS_FIRE = 300;

type LasersState = {
  ref: RefObject<Group>;
  id: string;
  position: Vector3;
  timeStamp: number;
};

export type SpaceshipState = {
  ref: RefObject<Group>;
  position: Position;
  rotation: Rotation;
};

export type AsteroidState = {
  ref: RefObject<Group>;
  id: string;
  position: Position;
  size: number;
  speed: number;
  rotationSpeed: { x: number; y: number };
};

type GameStore = {
  spaceship: SpaceshipState;
  asteroids: AsteroidState[];
  destroyAsteroid: (id: string) => void;
  createAsteroids: (quantity: number) => AsteroidState[];

  lasers: LasersState[];
  setLasersRef: (id: string, ref: RefObject<Group>) => void;
  lastLaserFired: number;
  fireLaser: () => void;
  cleanOldLasers: () => void;

  healthSpaceship: number;
  setHealthSpaceship: (newHealth: number) => void;
  score: number;
  setScore: (newScore: number) => void;

  isShipHitByAsteroid: () => void;
  isAsteroidHitByLaser: () => void;

  resetGame: () => void;
};

const initialAsteroids = createAsteroids(10);
const spaceship = createSpaceship();

export const useGameStore = create<GameStore>((set) => ({
  // SPACESHIP AND ASTEROIDS
  spaceship: spaceship,
  asteroids: initialAsteroids.map((asteroid) => ({
    ...asteroid,
  })),
  destroyAsteroid(id) {
    const updatedAsteroids = useGameStore
      .getState()
      .asteroids.filter((asteroid) => asteroid.id !== id);

    set({ asteroids: updatedAsteroids });
  },

  createAsteroids: (quantity) => {
    const { asteroids } = useGameStore.getState();
    const newAsteroids = createAsteroids(quantity);
    set({ asteroids: [...asteroids, ...newAsteroids] });
    return newAsteroids;
  },

  // LASERS
  lasers: [],
  lastLaserFired: 0,
  setLasersRef: (id, ref) => {
    set((state) => ({
      lasers: state.lasers.map((laser) =>
        laser.id === id ? { ...laser, ref } : laser
      ),
    }));
  },

  fireLaser: () => {
    set((state) => {
      const now = Date.now();
      const spaceshipRef = useGameStore.getState().spaceship.ref;
      if (
        now - state.lastLaserFired < COOLDOWN_BETWEN_LASERS_FIRE ||
        !spaceshipRef.current
      ) {
        return { ...state };
      }
      const currentPosition = spaceshipRef.current.position;

      const newLaser: LasersState = {
        ref: createRef(),
        id: `laser-${Date.now().toString(36)}-${Math.random()
          .toString(36)
          .substring(2)}`,
        position: currentPosition.clone(),
        timeStamp: Date.now(),
      };

      return {
        lasers: [...state.lasers, newLaser],
        lastLaserFired: now,
      };
    });
  },

  cleanOldLasers: () => {
    set((state) => {
      const cleanedLasers = state.lasers.filter((laser) => {
        const laserAge = Date.now() - laser.timeStamp;
        return laserAge < TIME_LASER_ACTIVE_IN_MS;
      });

      return {
        lasers: cleanedLasers,
      };
    });
  },

  // HEALTH AND SCORE
  healthSpaceship: 100,
  setHealthSpaceship: (newHealth) => {
    set({ healthSpaceship: newHealth });

    if (newHealth <= 0) {
      const { nextScene } = useSceneStore.getState();
      nextScene();
    }
  },
  score: 0,
  setScore: (newScore) => {
    set({ score: newScore });
  },

  // COLLISION DETECTION
  isShipHitByAsteroid: () => {
    const { spaceship, asteroids, setHealthSpaceship, destroyAsteroid } =
      useGameStore.getState();

    if (!spaceship.ref || !spaceship.ref.current) {
      return;
    }

    for (let { ref: asteroidRef, id: asteroidId } of asteroids) {
      if (
        asteroidRef.current &&
        checkCollision(spaceship.ref.current, asteroidRef.current)
      ) {
        const currentHealth = useGameStore.getState().healthSpaceship;
        setHealthSpaceship(currentHealth - 5);
        destroyAsteroid(asteroidId);
      }
    }
  },

  isAsteroidHitByLaser: () => {
    const { lasers, asteroids, destroyAsteroid, setScore } =
      useGameStore.getState();

    for (let { ref: laserRef } of lasers) {
      if (laserRef.current) {
        for (let { ref: asteroidRef, id: asteroidId } of asteroids) {
          if (
            asteroidRef.current &&
            checkCollision(laserRef.current, asteroidRef.current)
          ) {
            destroyAsteroid(asteroidId);
            const currentScore = useGameStore.getState().score;
            setScore(currentScore + 10);
          }
        }
      }
    }
    const { cleanOldLasers } = useGameStore.getState();
    cleanOldLasers();
  },

  resetGame: () => {
    set({
      asteroids: createAsteroids(10),
      healthSpaceship: 100,
      score: 0,
    });
  },
}));
