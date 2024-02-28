import { OrbitControls } from "@react-three/drei";
import { useGameStore } from "./store/useGameStore";
import { Floor } from "./components/Floor";
import { memo, useEffect } from "react";
import { Spaceship } from "./components/3DModels/Spaceship";
import "./globals.css";
import useControlsStore from "./store/useControlsStore";

const FloorMemoized = memo(Floor);
const COLLISION_TIME_INTERVAL = 500;

export function CoreGame() {
  const isShipHitByAsteroid = useGameStore(
    (state) => state.isShipHitByAsteroid
  );
  const initializeKeyboard = useControlsStore(
    (state) => state.initializeKeyboard
  );

  useEffect(() => {
    const interval = setInterval(() => {
      isShipHitByAsteroid();
    }, COLLISION_TIME_INTERVAL);
    const cleanUp = initializeKeyboard();

    return () => {
      clearInterval(interval);
      cleanUp();
    };
  }, [isShipHitByAsteroid]);

  return (
    <group>
      <ambientLight intensity={9} />

      <OrbitControls />

      <Spaceship />
      <FloorMemoized />
    </group>
  );
}
