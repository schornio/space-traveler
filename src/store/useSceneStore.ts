import { create } from "zustand";

export const ORDER_OF_SCENES = ["start", "game", "end"] as const;

type SceneState = {
  currentScene: (typeof ORDER_OF_SCENES)[number];
  nextScene: () => void;
  lastChanged: number;
};

const TIME_BEFORE_NEXT_SCENE = 2000;

export const useSceneStore = create<SceneState>((set) => ({
  currentScene: "end",
  lastChanged: 0,

  nextScene: () =>
    set((state) => {
      const now = Date.now();
      if (now - state.lastChanged < TIME_BEFORE_NEXT_SCENE) {
        return state;
      }

      const currentIndex = ORDER_OF_SCENES.indexOf(state.currentScene);
      const nextIndex = (currentIndex + 1) % ORDER_OF_SCENES.length;

      return {
        currentScene: ORDER_OF_SCENES[nextIndex],
        lastChanged: now,
      };
    }),
}));
