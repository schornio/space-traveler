import { RefObject } from "react";
import { Box3, Group, Mesh, Vector3 } from "three";
import { create } from "zustand";

type GameStore = {
  spaceshipRef: RefObject<Group> | null;
  setSpaceshipRef: (ref: RefObject<Group>) => void;

  asteroidsRef: RefObject<Mesh>[];
  setAsteroidsRef: (refs: RefObject<Mesh>[]) => void;

  lasersPosition: Vector3[];

  healthSpaceship: number;
  score: number;

  checkCollisionLaserWithAsteroid: () => { isCollision: boolean };
};

export const useGameStore = create<GameStore>((set) => ({
  spaceshipRef: null,
  setSpaceshipRef: (ref) => {
    set({ spaceshipRef: ref });
  },

  asteroidsRef: [],
  setAsteroidsRef: (refs) => {
    set({ asteroidsRef: refs });
  },

  lasersPosition: [],

  healthSpaceship: 100,
  score: 0,

  checkCollisionLaserWithAsteroid: () => {
    const spaceshipRef = useGameStore.getState().spaceshipRef;
    const asteroidsRef = useGameStore.getState().asteroidsRef;

    if (!spaceshipRef || !spaceshipRef.current) {
      return { isCollision: false };
    }

    const spaceshipBox = new Box3().setFromObject(spaceshipRef.current);

    asteroidsRef.forEach((asteroidRef) => {
      if (asteroidRef && asteroidRef.current) {
        const asteroidBox = new Box3().setFromObject(asteroidRef.current);
        const collision = spaceshipBox.intersectsBox(asteroidBox);

        if (collision) {
          //   console.log("collided");
          return { isCollision: true };
        }
      }
    });

    return { isCollision: false };
  },
}));
