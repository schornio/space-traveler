import { OrbitControls } from "@react-three/drei";
import { useGameStore } from "./store/useGameStore";
import { Floor } from "./components/Floor";
import { memo, useEffect } from "react";
import { Spaceship } from "./components/3DModels/Spaceship";
import "./globals.css";

const FloorMemoized = memo(Floor);
const COLLISION_TIME_INTERVAL = 1000;
const CHECK_LASER_HIT_INTERVAL = 500;

export function CoreGame() {
  const { isShipHitByAsteroid, isAsteroidHitByLaser } = useGameStore(
    (state) => ({
      isShipHitByAsteroid: state.isShipHitByAsteroid,
      isAsteroidHitByLaser: state.isAsteroidHitByLaser,
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      isShipHitByAsteroid();
    }, COLLISION_TIME_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [isShipHitByAsteroid]);

  useEffect(() => {
    const interval = setInterval(() => {
      isAsteroidHitByLaser();
    }, CHECK_LASER_HIT_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [isAsteroidHitByLaser]);

  return (
    <group>
      <ambientLight intensity={9} />

      {/* <OrbitControls /> */}

      <Spaceship />
      <FloorMemoized />
    </group>
  );
}
