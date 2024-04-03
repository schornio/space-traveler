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
        positionIn: 0.3,
        positionTop: 0.8,
      })}
      rotation={toRotation({
        rotationXInDeg: -70,
      })}
    >
      <Button
        positionTop={0.15}
        positionLeft={0.2}
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
        positionOut={0.008}
        positionBottom={0.15}
        positionLeft={0.2}
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
        positionLeft={0.35}
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
        positionLeft={0.05}
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
        positionRight={0.25}
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
