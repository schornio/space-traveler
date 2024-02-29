import { Controllers, Hands, XRCanvas } from "@coconut-xr/natuerlich/defaults";
import {
  ImmersiveSessionOrigin,
  useInputSources,
  useXRGamepadReader,
} from "@coconut-xr/natuerlich/react";
import { Environment } from "@react-three/drei";
import { CoreGame } from "./CoreGame";
import useControlsStore from "./store/useControlsStore";
import { SphereBackground } from "./components/SphereBackground";
import { HandVRControls } from "./components/HandVRControls/HandVRControls";
import { Vector2 } from "three";
import { useState } from "react";
import { useFrame } from "@react-three/fiber";
import { toPosition } from "./utils/toPosition";
import { useControllerJoystick } from "./hooks/useControllerJoystick";

export function VRScene() {
  const setControls = useControlsStore((state) => state.setCellphoneControls);

  return (
    <XRCanvas>
      <ImmersiveSessionOrigin>
        <CoreGame />
        <HandVRControls setControls={setControls} />

        <Environment preset="city" background />
        <SphereBackground />
        <Hands type="touch" />
        <Controllers type="pointer" />

        <Gamepad />
      </ImmersiveSessionOrigin>
    </XRCanvas>
  );
}

function Gamepad() {
  const inputSources = useInputSources();
  const leftInputSource = inputSources.find((s) => s.handedness === "left");
  const rightInputSource = inputSources.find((s) => s.handedness === "right");

  return (
    <>
      {leftInputSource && <InputSource inputSource={leftInputSource} />}
      {rightInputSource && <InputSource inputSource={rightInputSource} />}
    </>
  );
}

/* 
https://codesandbox.io/p/sandbox/natuerlich-gamepad-api-example-l48gx5?file=%2Fsrc%2Fcomponents%2Fgamepad%2FAxes.tsx%3A33%2C30
*/

function InputSource({ inputSource }: { inputSource: XRInputSource }) {
  const axes = [
    ...(inputSource.handedness === "left"
      ? ["x-button", "y-button"]
      : ["a-button", "b-button"]),
    "xr-standard-trigger",
    "xr-standard-squeeze",
    "thumbrest",
  ];

  return (
    <group>
      <Axes inputSource={inputSource} />
    </group>
  );
}

// const SIZE = 100;
// const MOVEMENT_SPEED = 0.1;

function Axes({ inputSource }: { inputSource: XRInputSource }) {
  const position = useControllerJoystick({
    inputSource,
  });

  return (
    <group
      position={toPosition({
        positionIn: 1,
        positionTop: 1,
      })}
    >
      <mesh position={[position.x, position.y, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="purple" />
      </mesh>
    </group>
  );
}
