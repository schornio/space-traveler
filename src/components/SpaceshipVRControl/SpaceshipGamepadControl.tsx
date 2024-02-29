import { useGamepadActions } from "../../hooks/useGamepadActions";
import { useGameStore } from "../../store/useGameStore";
import { useFrame } from "@react-three/fiber";

type SpaceshipGamepadControlProps = {
  inputSource: XRInputSource;
};

export function SpaceshipGamepadControl({
  inputSource,
}: SpaceshipGamepadControlProps) {
  const { thumbstickPosition, buttonsState } = useGamepadActions({
    inputSource,
  });
  const { spaceshipRef, fireLaser } = useGameStore((state) => ({
    spaceshipRef: state.spaceship.ref,
    fireLaser: state.fireLaser,
  }));
  const activateFireLaser =
    buttonsState["xr-standard-trigger"]?.pressed === true || false;

  useFrame(() => {
    if (spaceshipRef.current) {
      spaceshipRef.current.position.x += thumbstickPosition.x;
      spaceshipRef.current.position.y += thumbstickPosition.y;

      if (activateFireLaser) {
        fireLaser();
      }
    }
  });

  return null;
}
