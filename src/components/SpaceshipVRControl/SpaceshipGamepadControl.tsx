import { ActionControls } from "../../store/useControlsStore";
import { useGamepadActions } from "../../hooks/useGamepadActions";
import { useGameStore } from "../../store/useGameStore";
import { useFrame } from "@react-three/fiber";

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

  useFrame(() => {
    if (spaceshipRef.current) {
      spaceshipRef.current.position.x += thumbstickPosition.x;
      spaceshipRef.current.position.y += thumbstickPosition.y;
    }
  });

  console.log("thumbstickPosition.x", thumbstickPosition.x);
  //   console.log("thumbstickPosition.y", thumbstickPosition.y);

  return null;
}
