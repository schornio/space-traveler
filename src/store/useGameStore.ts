import { RefObject } from "react";
import { Box3, Group, Mesh } from "three";
import { create } from "zustand";
import { createAsteroids } from "../utils/createAsteroids";
import { Position } from "../utils/toPosition";
import { Rotation } from "../utils/toRotation";
import { createSpaceship } from "../utils/createSpaceship";

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
  rotationSpeed: { x: number; y: number };
  isDestroyed: boolean;
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
  score: number;

  isShipHitByAsteroid: () => { isHit: boolean };
  isAsteroidHitByLaser: () => { isHit: boolean };
};

const initialAsteroids = createAsteroids(200);
const spaceship = createSpaceship();

export const useGameStore = create<GameStore>((set) => ({
  asteroids: initialAsteroids.map((asteroid) => ({
    ...asteroid,
  })),

  spaceship: spaceship,

  destroyAsteroid(id) {
    const updatedAsteroids = useGameStore
      .getState()
      .asteroids.filter((asteroid) => asteroid.id !== id);

    set({ asteroids: updatedAsteroids });
  },

  lasersRef: [],

  cleanUpLasersRef() {
    set((state) => ({
      lasersRef: state.lasersRef.filter(
        ({ timeStamp }) => Date.now() - timeStamp < TIME_LASER_ACTIVE_IN_MS
      ),
    }));
  },

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

  healthSpaceship: 100,
  score: 0,

  isShipHitByAsteroid: () => {
    const spaceshipRef = useGameStore.getState().spaceship.ref;
    const asteroidsRef = useGameStore
      .getState()
      .asteroids.map(({ ref }) => ref);

    if (!spaceshipRef || !spaceshipRef.current) {
      return { isHit: false };
    }

    const spaceshipBox = new Box3().setFromObject(spaceshipRef.current);

    for (let asteroidRef of asteroidsRef) {
      if (asteroidRef.current) {
        const asteroidBox = new Box3().setFromObject(asteroidRef.current);
        if (spaceshipBox.intersectsBox(asteroidBox)) {
          return { isHit: true };
        }
      }
    }

    return { isHit: false };
  },

  isAsteroidHitByLaser: () => {
    const { lasersRef, asteroids, destroyAsteroid } = useGameStore.getState();

    for (let { ref: laserRef } of lasersRef) {
      if (laserRef.current) {
        const laserBox = new Box3().setFromObject(laserRef.current);

        for (let { ref: asteroidRef, id: asteroidId } of asteroids) {
          if (asteroidRef.current) {
            const asteroidBox = new Box3().setFromObject(asteroidRef.current);

            if (laserBox.intersectsBox(asteroidBox)) {
              destroyAsteroid(asteroidId);
              return { isHit: true };
            }
          }
        }
      }
    }

    return { isHit: false };
  },
}));
