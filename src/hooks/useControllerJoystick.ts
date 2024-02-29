import { useXRGamepadReader } from "@coconut-xr/natuerlich/react";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import { Vector2 } from "three";

type ControllerJoystickProps = {
  inputSource: XRInputSource;
  movementSpeed?: number;
};

export function useControllerJoystick({
  inputSource,
  movementSpeed = 2,
}: ControllerJoystickProps) {
  const [vector] = useState(new Vector2());
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reader = useXRGamepadReader(inputSource);

  useFrame((_, delta) => {
    if (reader) {
      reader.readAxes("xr-standard-thumbstick", vector);
      const deltaX = vector.x * movementSpeed * delta;
      const deltaY = vector.y * movementSpeed * delta * -1; // Invert y-axis

      setPosition((prevPosition) => ({
        x: prevPosition.x + deltaX,
        y: prevPosition.y + deltaY,
      }));
    }
  });

  return position;
}
