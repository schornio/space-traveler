import { RefObject } from "react";
import { Box3, Group, Mesh } from "three";
import { create } from "zustand";
import { createAsteroids } from "../utils/createAsteroids";
import { Position } from "../utils/toPosition";
import { Rotation } from "../utils/toRotation";
import { createSpaceship } from "../utils/createSpaceship";
import { checkCollision } from "../utils/checkCollision";

type LaserWithTimeStamp = {
  ref: RefObject<Group>;
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

const TIME_LASER_ACTIVE_IN_MS = 5000;

type GameStore = {
  spaceship: SpaceshipState;
  asteroids: AsteroidState[];
  destroyAsteroid: (id: string) => void;

  lasersRef: LaserWithTimeStamp[];
  setLasersRef: (newRef: RefObject<Group>) => void;
  cleanUpLasersRef: () => void;

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

  lasersRef: [],
  setLasersRef: (newRef) => {
    set((state) => ({
      lasersRef: [
        ...state.lasersRef,
        {
          ref: newRef,
          timeStamp: Date.now(),
        },
      ],
    }));
  },
  cleanUpLasersRef() {
    set((state) => ({
      lasersRef: state.lasersRef.filter(
        ({ timeStamp }) => Date.now() - timeStamp < TIME_LASER_ACTIVE_IN_MS
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
    const {
      lasersRef,
      asteroids,
      destroyAsteroid,
      setScore,
      cleanUpLasersRef,
    } = useGameStore.getState();

    for (let { ref: laserRef } of lasersRef) {
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

      cleanUpLasersRef();
    }
  },
}));
