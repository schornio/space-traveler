import { useState, useEffect } from "react";

const ACTIONS = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
  shoot: "shoot",
} as const;

export type ActionKey = keyof typeof ACTIONS;
type ControlsState = Record<ActionKey, boolean>;

export function useControls() {
  const [controls, setControls] = useState<ControlsState>({
    up: false,
    down: false,
    left: false,
    right: false,
    shoot: false,
  });

  console.log("controls", controls); // up returns true when pressed

  const updateControls = (action: ActionKey, value: boolean) => {
    // console.log("updateControls called");

    if (ACTIONS[action]) {
      //   console.log("action", action); // when I press the button up it returns correctly

      setControls((controls) => ({ ...controls, [action]: value }));
    }
  };

  //   console.log("controls", controls);

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

  //   console.log("useControls: up", controls.up); // returns true both with the button and with the w
  //   console.log("useControls: controls", controls);

  return { controls, updateControls };
}
