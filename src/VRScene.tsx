import { Controllers, Hands, XRCanvas } from "@coconut-xr/natuerlich/defaults";
import { ImmersiveSessionOrigin, useXR } from "@coconut-xr/natuerlich/react";
import { Environment } from "@react-three/drei";
import { CoreGame } from "./CoreGame";
import Button from "./components/Button";
import { toPosition } from "./utils/toPosition";
import { toRotation } from "./utils/toRotation";
import useControlsStore, { ActionControls } from "./store/useControlsStore";
import { useCallback } from "react";

export function VRScene() {
  const setControls = useControlsStore((state) => state.setCellphoneControls);

  const onVRHandInteraction = useCallback(
    (action: keyof ActionControls, value: boolean) => {
      setControls(action, value);
    },
    []
  );

  return (
    <XRCanvas>
      <ImmersiveSessionOrigin>
        <Environment preset="city" background />

        <Hands type="touch" />
        <Controllers type="pointer" />

        <group
          position={toPosition({
            positionLeft: 0.3,
            positionTop: 0.2,
            positionIn: 0.2,
          })}
          scale={0.8}
          rotation={toRotation({
            rotationXInDeg: -20,
          })}
        >
          <Button
            positionTop={1}
            onPressStart={() => {
              onVRHandInteraction("up", true);
            }}
            onPressEnd={() => {
              onVRHandInteraction("up", false);
            }}
          >
            👆
          </Button>

          <Button
            positionTop={0.6}
            onPressStart={() => {
              onVRHandInteraction("down", true);
            }}
            onPressEnd={() => {
              onVRHandInteraction("down", false);
            }}
          >
            👇
          </Button>

          <Button
            positionTop={0.8}
            positionLeft={0.25}
            onPressStart={() => {
              onVRHandInteraction("left", true);
            }}
            onPressEnd={() => {
              onVRHandInteraction("left", false);
            }}
          >
            👈
          </Button>

          <Button
            positionTop={0.8}
            positionRight={0.25}
            onPressStart={() => {
              onVRHandInteraction("right", true);
            }}
            onPressEnd={() => {
              onVRHandInteraction("right", false);
            }}
          >
            👉
          </Button>

          <Button
            positionTop={0.8}
            positionRight={1}
            onPressStart={() => {
              onVRHandInteraction("shoot", true);
            }}
            onPressEnd={() => {
              onVRHandInteraction("shoot", false);
            }}
          >
            🔫
          </Button>
        </group>
        <CoreGame />
      </ImmersiveSessionOrigin>
    </XRCanvas>
  );
}
