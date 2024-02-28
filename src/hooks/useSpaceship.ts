import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { LaserProps } from "../components/3DModels/Laser";
import { fromPixelsToMeters } from "../utils/fromPixelsToMeters";
import { useGameStore } from "../store/useGameStore";
import { useControls } from "./useControls";

const POSSIBLE_LASER_HIT_TIME = 3000;
const LASER_CHECK_HIT_ITERATION = 100;
const WINDOW_HALF_X = fromPixelsToMeters(window.innerWidth / 2);
const WINDOW_HALF_Y = fromPixelsToMeters(window.innerHeight / 2);

export function useSpaceship() {
  const { spaceshipRef, isAsteroidHitByLaser } = useGameStore((state) => ({
    spaceshipRef: state.spaceship.ref,
    isAsteroidHitByLaser: state.isAsteroidHitByLaser,
  }));
  const speed = 1;
  const [lasers, setLasers] = useState<LaserProps[]>([]);
  const {
    controls: { up, down, left, right, shoot },
  } = useControls(); //using controls directly

  // console.log("useSpaceship: controls", controls); //returns true just with the 'w'
  console.log(up, down, left, right, shoot);

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
