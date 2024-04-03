import { useFrame } from "@react-three/fiber";
import { fromPixelsToMeters } from "../utils/fromPixelsToMeters";
import { useGameStore } from "../store/useGameStore";
import useControlsStore from "../store/useControlsStore";
import { useCurrentDevice } from "../store/useCurrentDevice";

export function useSpaceship() {
  const { spaceshipRef, fireLaser } = useGameStore((state) => ({
    spaceshipRef: state.spaceship.ref,
    fireLaser: state.fireLaser,
  }));
  const speed = 1;
  const { up, down, left, right, shoot } = useControlsStore(
    (state) => state.controls
  );
  const currentDevice = useCurrentDevice();

  const windowHalfX = fromPixelsToMeters(
    currentDevice === "touchDevice" ? window.innerWidth : window.innerWidth / 2
  );
  const windowHalfY = fromPixelsToMeters(
    currentDevice === "touchDevice"
      ? window.innerWidth / 1.6
      : window.innerHeight / 1.8
  );

  useFrame(() => {
    if (spaceshipRef.current) {
      const delta = speed / 10;
      let newPositionY = spaceshipRef.current.position.y;
      let newPositionX = spaceshipRef.current.position.x;

      if (up) {
        newPositionY += delta;
      }
      if (down) {
        newPositionY -= delta;
      }
      if (left) {
        newPositionX -= delta;
      }
      if (right) {
        newPositionX += delta;
      }
      if (shoot) {
        fireLaser();
      }

      newPositionX = Math.max(
        -windowHalfX,
        Math.min(windowHalfX, newPositionX)
      );
      newPositionY = Math.max(
        -windowHalfY,
        Math.min(windowHalfY, newPositionY)
      );

      spaceshipRef.current.position.y = newPositionY;
      spaceshipRef.current.position.x = newPositionX;
    }
  });
}
