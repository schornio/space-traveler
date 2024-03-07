import { useFrame } from "@react-three/fiber";
import { fromPixelsToMeters } from "../utils/fromPixelsToMeters";
import { useGameStore } from "../store/useGameStore";
import useControlsStore from "../store/useControlsStore";

const WINDOW_HALF_X = fromPixelsToMeters(window.innerWidth / 2);
const WINDOW_HALF_Y = fromPixelsToMeters(window.innerHeight / 2);

export function useSpaceship() {
  const { spaceshipRef, fireLaser } = useGameStore((state) => ({
    spaceshipRef: state.spaceship.ref,
    fireLaser: state.fireLaser,
  }));
  const speed = 1;
  const { up, down, left, right, shoot } = useControlsStore(
    (state) => state.controls
  );

  useFrame(() => {
    if (spaceshipRef.current) {
      const delta = speed / 5;
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
        -WINDOW_HALF_X,
        Math.min(WINDOW_HALF_X, newPositionX)
      );
      newPositionY = Math.max(
        -WINDOW_HALF_Y,
        Math.min(WINDOW_HALF_Y, newPositionY)
      );

      spaceshipRef.current.position.y = newPositionY;
      spaceshipRef.current.position.x = newPositionX;
    }
  });
}
