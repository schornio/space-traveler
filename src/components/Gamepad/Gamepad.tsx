import { useInputSources } from "@coconut-xr/natuerlich/react";
import { useThree } from "@react-three/fiber";
import { InputSource } from "./InputSource";

export function Gamepad() {
  const aspectRatio = useThree(({ size }) => size.width / size.height);
  const inputSources = useInputSources();
  const left = inputSources.find((s) => s.handedness === "left");
  const right = inputSources.find((s) => s.handedness === "right");

  return (
    <group
      position={[0, 1.5, -0.4]}
      scale={Math.min(1, aspectRatio * 0.7) / 1200}
    >
      {left && <InputSource inputSource={left} />}
      {right && <InputSource inputSource={right} />}
    </group>
  );
}
