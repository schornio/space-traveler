import { ActionControls } from "../../store/useControlsStore";
import { useGamepadActions } from "../../hooks/useGamepadActions";
import { useGameStore } from "../../store/useGameStore";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { toPosition } from "../../utils/toPosition";

type SpaceshipGamepadControlProps = {
  onInteraction: (action: keyof ActionControls, value: boolean) => void;
  inputSource: XRInputSource;
};

export function SpaceshipGamepadControl({
  onInteraction,
  inputSource,
}: SpaceshipGamepadControlProps) {
  const { thumbstickPosition, buttonsState } = useGamepadActions({
    inputSource,
  });

  const spaceshipRef = useGameStore((state) => state.spaceship.ref);
  const fireLaser =
    buttonsState["xr-standard-trigger"]?.pressed === true || false;

  useFrame(() => {
    if (spaceshipRef.current) {
      spaceshipRef.current.position.x += thumbstickPosition.x;
      spaceshipRef.current.position.y += thumbstickPosition.y;
    }
  });

  console.log("fireLaser", fireLaser);

  return (
    <Text
      fontSize={0.1}
      position={toPosition({
        positionIn: 1,
      })}
    >
      {fireLaser}
    </Text>
  );
}
