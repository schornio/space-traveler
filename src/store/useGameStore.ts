import { RefObject } from "react";
import { Box3, Group, Mesh, Vector3 } from "three";
import { create } from "zustand";
import { createAsteroids } from "../utils/createAsteroids";
import { Position } from "../utils/toPosition";

type LaserWithTimeStamp = {
  ref: RefObject<Group>;
  timeStamp: number;
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
  spaceshipRef: RefObject<Group> | null;
  setSpaceshipRef: (ref: RefObject<Group>) => void;

  asteroids: AsteroidState[];
  asteroidsRef: RefObject<Mesh>[];
  setAsteroidsRef: (refs: RefObject<Mesh>[]) => void;

  lasersRef: LaserWithTimeStamp[];
  setLasersRef: (newRef: RefObject<Group>) => void;
  cleanUpLasersRef: () => void;

  healthSpaceship: number;
  score: number;

  isShipHitByAsteroid: () => { isHit: boolean };
  isAsteroidHitByLaser: () => { isHit: boolean };
};

const initialAsteroids = createAsteroids(200);

export const useGameStore = create<GameStore>((set) => ({
  asteroids: initialAsteroids.map((asteroid) => ({
    ...asteroid,
  })),

  spaceshipRef: null,
  setSpaceshipRef: (ref) => {
    set({ spaceshipRef: ref });
  },

  asteroidsRef: [],
  setAsteroidsRef: (refs) => {
    set({ asteroidsRef: refs });
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
    const spaceshipRef = useGameStore.getState().spaceshipRef;
    const asteroidsRef = useGameStore.getState().asteroidsRef;

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
    const lasersRef = useGameStore.getState().lasersRef;
    const asteroidsRef = useGameStore.getState().asteroidsRef;

    for (let { ref: laserRef } of lasersRef) {
      if (laserRef.current) {
        const laserBox = new Box3().setFromObject(laserRef.current);

        for (let asteroidRef of asteroidsRef) {
          if (asteroidRef.current) {
            const asteroidBox = new Box3().setFromObject(asteroidRef.current);
            if (laserBox.intersectsBox(asteroidBox)) {
              return { isHit: true };
            }
          }
        }
      }
    }

    return { isHit: false };
  },
}));
