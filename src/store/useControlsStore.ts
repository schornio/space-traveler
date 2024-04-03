import { create } from "zustand";

export type ActionControls = {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  shoot: boolean;
};

type ControlsStore = {
  controls: ActionControls;
  setControls: (key: keyof ActionControls, value: boolean) => void;
  initializeKeyboard: () => () => void;
};

const useControlsStore = create<ControlsStore>((set) => ({
  controls: {
    up: false,
    down: false,
    left: false,
    right: false,
    shoot: false,
  },

  setControls: (key, value) =>
    set((state) => ({
      controls: { ...state.controls, [key]: value },
    })),

  initializeKeyboard: () => {
    const keyMap: { [key: string]: keyof ActionControls } = {
      w: "up",
      s: "down",
      a: "left",
      d: "right",
      " ": "shoot",
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const action = keyMap[e.key];
      if (action) {
        set((state) => ({
          controls: { ...state.controls, [action]: true },
        }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const action = keyMap[e.key];
      if (action) {
        set((state) => ({
          controls: { ...state.controls, [action]: false },
        }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const cleanUp = () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };

    return cleanUp;
  },
}));

export default useControlsStore;
