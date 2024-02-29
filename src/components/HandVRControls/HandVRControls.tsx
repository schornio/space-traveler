import { useCallback } from "react";
import { toPosition } from "../../utils/toPosition";
import { ActionControls } from "../../store/useControlsStore";
import { toRotation } from "../../utils/toRotation";
import Button from "../Button";

type HandVRControlsProps = {
  setControls: (action: keyof ActionControls, value: boolean) => void;
};

const amIsitting = false;

export function HandVRControls({ setControls }: HandVRControlsProps) {
  const onVRHandInteraction = useCallback(
    (action: keyof ActionControls, value: boolean) => {
      setControls(action, value);
    },
    []
  );

  return (
    <group
      position={toPosition({
        positionLeft: 0.3,
        positionTop: amIsitting ? 0.2 : 0.5,
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
  );
}
