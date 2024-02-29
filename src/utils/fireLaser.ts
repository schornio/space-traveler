import { RefObject, useState } from "react";
import { LaserProps } from "../components/3DModels/Laser";
import { useGameStore } from "../store/useGameStore";
import { Object3D } from "three";

export function fireLaser(spaceshipRef: RefObject<Object3D>) {
  const [lasers, setLasers] = useState<LaserProps[]>([]);
  const isAsteroidHitByLaser = useGameStore(
    (state) => state.isAsteroidHitByLaser
  );

  if (spaceshipRef.current) {
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
}
