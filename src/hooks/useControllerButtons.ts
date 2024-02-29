import { useXRGamepadReader } from "@coconut-xr/natuerlich/react";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

type ButtonState = {
  [key: string]: {
    pressed: boolean;
    value: number;
  };
};

export function useControllerButtons(inputSource: XRInputSource) {
  const [buttonState, setButtonState] = useState<ButtonState>({});
  const reader = useXRGamepadReader(inputSource);
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
      const newButtonState = tracked_buttons.reduce((acc, button) => {
        acc[button] = {
          pressed: reader.readButtonState(button),
          value: reader.readButtonValue(button),
        };
        return acc;
      }, {} as ButtonState);

      setButtonState(newButtonState);
    }
  });

  return buttonState;
}
