import { useState, useEffect } from "react";

const ACTIONS = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
  shoot: "shoot",
} as const;

type ActionKey = keyof typeof ACTIONS;
type ControlsState = Record<ActionKey, boolean>;

export function useControls() {
  const [controls, setControls] = useState<ControlsState>({
    up: false,
    down: false,
    left: false,
    right: false,
    shoot: false,
  });

  const updateControls = (action: ActionKey, value: boolean) => {
    if (ACTIONS[action]) {
      setControls((controls) => ({ ...controls, [action]: value }));
    }
  };

  const keyboardHandlers = (e: KeyboardEvent, type: "keyDown" | "keyUp") => {
    switch (e.key.toLowerCase()) {
      case "w":
        updateControls("up", type === "keyDown");
        break;
      case "s":
        updateControls("down", type === "keyDown");
        break;
      case "a":
        updateControls("left", type === "keyDown");
        break;
      case "d":
        updateControls("right", type === "keyDown");
        break;
      case " ":
        updateControls("shoot", type === "keyDown");
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => keyboardHandlers(e, "keyDown"));
    window.addEventListener("keyup", (e) => keyboardHandlers(e, "keyUp"));

    return () => {
      window.removeEventListener("keydown", (e) =>
        keyboardHandlers(e, "keyDown")
      );
      window.removeEventListener("keyup", (e) => keyboardHandlers(e, "keyUp"));
    };
  }, []);

  return controls;
}
