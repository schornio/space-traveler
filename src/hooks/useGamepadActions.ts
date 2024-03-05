import { useXRGamepadReader } from "@coconut-xr/natuerlich/react";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import { Vector2 } from "three";

type ButtonsState = {
  [key: string]: {
    pressed: boolean;
    value: number;
  };
};

type ThumstickPosition = {
  x: number;
  y: number;
};

type GamepadActionsProps = {
  inputSource: XRInputSource;
  movementSpeed?: number;
};

type GamepadActionsReturn = {
  buttonsState: ButtonsState;
  thumbstickPosition: ThumstickPosition;
};

export function useGamepadActions({
  inputSource,
  movementSpeed = 0.08,
}: GamepadActionsProps): GamepadActionsReturn {
  const reader = useXRGamepadReader(inputSource);
  const [thumbstickPosition, setThumbstickPosition] =
    useState<ThumstickPosition>({ x: 0, y: 0 });
  const vector = new Vector2();
  const [buttonsState, setButtonsState] = useState<ButtonsState>({});
  const tracked_buttons = [
    ...(inputSource.handedness === "left"
      ? ["x-button", "y-button"]
      : ["a-button", "b-button"]),
    "xr-standard-trigger",
    "xr-standard-squeeze",
    "thumbrest",
  ];

  useFrame(() => {
    if (reader) {
      reader.readAxes("xr-standard-thumbstick", vector);

      setThumbstickPosition({
        x: vector.x * movementSpeed,
        y: vector.y * movementSpeed * -1,
      });

      const newButtonState = tracked_buttons.reduce((acc, button) => {
        acc[button] = {
          pressed: reader.readButtonState(button) === "pressed",
          value: reader.readButtonValue(button),
        };
        return acc;
      }, {} as ButtonsState);

      setButtonsState(newButtonState);
    }
  });

  return { buttonsState, thumbstickPosition };
}
