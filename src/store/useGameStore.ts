import { RefObject, createRef } from "react";
import { Group, Mesh, Object3D, Vector3 } from "three";
import { create } from "zustand";
import { createAsteroids } from "../utils/createAsteroids";
import { Position } from "../utils/toPosition";
import { Rotation } from "../utils/toRotation";
import { createSpaceship } from "../utils/createSpaceship";
import { checkCollision } from "../utils/checkCollision";

const POSSIBLE_LASER_HIT_TIME = 3000;
const LASER_CHECK_HIT_ITERATION = 100;
const TIME_LASER_ACTIVE_IN_MS = 5000;

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
  ref: RefObject<Mesh>;
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

  lasers: LasersState[];
  fireLaser: () => void;
  cleanOldLasers: () => void;

  healthSpaceship: number;
  setHealthSpaceship: (newHealth: number) => void;
  score: number;
  setScore: (newScore: number) => void;

  isShipHitByAsteroid: () => void;
  isAsteroidHitByLaser: () => void;
};

const initialAsteroids = createAsteroids(200);
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

  // LASERS
  lasers: [],
  fireLaser: () =>
    set((state) => {
      const spaceshipRef = useGameStore.getState().spaceship.ref;

      if (spaceshipRef.current) {
        const currentPosition = spaceshipRef.current.position;
        // console.log("currentPosition", currentPosition);

        const { isAsteroidHitByLaser, cleanOldLasers } =
          useGameStore.getState();

        const newLaser: LasersState = {
          ref: createRef(),
          id: `laser-${state.lasers.length}`,
          position: currentPosition.clone(),
          timeStamp: Date.now(),
        };

        setTimeout(() => {
          isAsteroidHitByLaser();
        }, LASER_CHECK_HIT_ITERATION);

        if (state.lasers.length > 5) {
          cleanOldLasers();
        }

        return {
          lasers: [...state.lasers, newLaser],
        };
      }
    }),

  cleanOldLasers: () => {
    set((state) => ({
      lasers: state.lasers.filter(
        (laser) => Date.now() - laser.timeStamp < TIME_LASER_ACTIVE_IN_MS
      ),
    }));
  },

  // HEALTH AND SCORE
  healthSpaceship: 100,
  setHealthSpaceship: (newHealth) => {
    set({ healthSpaceship: newHealth });
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
  },
}));
