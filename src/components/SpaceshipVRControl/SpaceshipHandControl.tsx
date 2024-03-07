import { ActionControls } from "../../store/useControlsStore";
import { toPosition } from "../../utils/toPosition";
import { toRotation } from "../../utils/toRotation";
import Button from "../Button";

type SpaceshipHandControlProps = {
  onInteraction: (action: keyof ActionControls, value: boolean) => void;
};

export function SpaceshipHandControl({
  onInteraction,
}: SpaceshipHandControlProps) {
  return (
    <group
      position={toPosition({
        positionLeft: 0.3,
        positionTop: 0.6,
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
          onInteraction("up", true);
        }}
        onPressEnd={() => {
          onInteraction("up", false);
        }}
      >
        👆
      </Button>

      <Button
        positionTop={0.6}
        onPressStart={() => {
          onInteraction("down", true);
        }}
        onPressEnd={() => {
          onInteraction("down", false);
        }}
      >
        👇
      </Button>

      <Button
        positionTop={0.8}
        positionLeft={0.2}
        onPressStart={() => {
          onInteraction("left", true);
        }}
        onPressEnd={() => {
          onInteraction("left", false);
        }}
      >
        👈
      </Button>

      <Button
        positionTop={0.8}
        positionRight={0.2}
        onPressStart={() => {
          onInteraction("right", true);
        }}
        onPressEnd={() => {
          onInteraction("right", false);
        }}
      >
        👉
      </Button>

      <Button
        positionTop={0.8}
        positionRight={0.7}
        onPressStart={() => {
          onInteraction("shoot", true);
        }}
        onPressEnd={() => {
          onInteraction("shoot", false);
        }}
      >
        🔫
      </Button>
    </group>
  );
}
