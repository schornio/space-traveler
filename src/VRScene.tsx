import { Controllers, Hands, XRCanvas } from "@coconut-xr/natuerlich/defaults";
import {
  ImmersiveSessionOrigin,
  useInputSources,
  useXRGamepadReader,
} from "@coconut-xr/natuerlich/react";
import { Environment, Text } from "@react-three/drei";
import { CoreGame } from "./CoreGame";
import useControlsStore from "./store/useControlsStore";
import { SphereBackground } from "./components/SphereBackground";
import { HandVRControls } from "./components/HandVRControls/HandVRControls";
import { toPosition } from "./utils/toPosition";
import { fontSize } from "./utils/fontSizes";
import { useControllerActions } from "./hooks/useControllerActions";

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
  return (
    <group>
      <Ball inputSource={inputSource} />
    </group>
  );
}

function Ball({ inputSource }: { inputSource: XRInputSource }) {
  const { thumbstickPosition, buttonsState } = useControllerActions({
    inputSource,
  });

  return (
    <group
      position={toPosition({
        positionIn: 1,
        positionTop: 1,
      })}
    >
      <mesh position={[thumbstickPosition.x, thumbstickPosition.y, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="purple" />
      </mesh>

      <Text fontSize={fontSize.md}>
        {JSON.stringify(buttonsState, null, 2)}
      </Text>
    </group>
  );
}
