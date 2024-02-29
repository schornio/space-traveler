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

type ControllerActionsProps = {
  inputSource: XRInputSource;
  movementSpeed?: number;
};

type ControllerActionsReturn = {
  buttonsState: ButtonsState;
  thumbstickPosition: ThumstickPosition;
};

export function useControllerActions({
  inputSource,
  movementSpeed = 2,
}: ControllerActionsProps): ControllerActionsReturn {
  const reader = useXRGamepadReader(inputSource);
  const [thumbstickPosition, setThumstickPosition] =
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

  useFrame((_, delta) => {
    if (reader) {
      reader.readAxes("xr-standard-thumbstick", vector);
      const deltaX = vector.x * movementSpeed * delta;
      const deltaY = vector.y * movementSpeed * delta * -1; // Invert y-axis

      setThumstickPosition((prevPosition) => ({
        x: prevPosition.x + deltaX,
        y: prevPosition.y + deltaY,
      }));

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
