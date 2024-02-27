import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { LaserProps } from "../components/3DModels/Laser";
import { fromPixelsToMeters } from "../utils/fromPixelsToMeters";
import { useGameStore } from "../store/useGameStore";
import { useControls } from "./useControls";

const POSSIBLE_LASER_HIT_TIME = 3000;
const LASER_CHECK_HIT_ITERATION = 100;

export function useSpaceship() {
  const { spaceshipRef, isAsteroidHitByLaser } = useGameStore((state) => ({
    spaceshipRef: state.spaceship.ref,
    isAsteroidHitByLaser: state.isAsteroidHitByLaser,
  }));
  const speed = 1;
  const [lasers, setLasers] = useState<LaserProps[]>([]);
  const { up, down, left, right, shoot } = useControls();
  const windowHalfX = fromPixelsToMeters(window.innerWidth / 2);
  const windowHalfY = fromPixelsToMeters(window.innerHeight / 2);

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

  useEffect(() => {
    const fireLaser = () => {
      if (shoot && spaceshipRef.current) {
        const currentPosition = spaceshipRef.current.position;
        spaceshipRef.current.getWorldPosition(currentPosition);

        setLasers((lasers) => [
          ...lasers,
          {
            id: `laser-${lasers.length}`,
            position: currentPosition,
          },
        ]);

        const intervalId = setInterval(() => {
          isAsteroidHitByLaser();
        }, LASER_CHECK_HIT_ITERATION);

        setTimeout(() => {
          clearInterval(intervalId);
        }, POSSIBLE_LASER_HIT_TIME);
      }
    };

    window.addEventListener("keydown", fireLaser);
    fireLaser();

    return () => window.removeEventListener("keydown", fireLaser);
  }, [shoot]);

  return lasers;
}
