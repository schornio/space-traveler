import { Center, OrbitControls, Text, Text3D } from "@react-three/drei";
import { toPosition } from "./utils/toPosition";
import { fontSize } from "./utils/fontSizes";
import { useGameStore } from "./store/useGameStore";
import { Floor } from "./components/Floor";
import { memo, useEffect } from "react";
import { schornColors } from "./constants/schornColors";
import { Spaceship } from "./components/3DModels/Spaceship";
import { Canvas } from "@react-three/fiber";
import "./globals.css";
import useControlsStore from "./store/useControlsStore";

const FloorMemoized = memo(Floor);
const COLLISION_TIME_INTERVAL = 500;

export function CoreGame() {
  const { healthSpaceship, score, isShipHitByAsteroid } = useGameStore(
    (state) => ({
      isShipHitByAsteroid: state.isShipHitByAsteroid,
      healthSpaceship: state.healthSpaceship,
      score: state.score,
    })
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
    <Canvas>
      <Center
        position={toPosition({
          positionTop: 2,
          positionLeft: 3,
        })}
      >
        <Text3D
          font="/neo_cybern.json"
          size={fontSize.xl}
          curveSegments={24}
          scale={[1, 1, 0.2]}
        >
          Health: {healthSpaceship}
          <meshStandardMaterial
            attach="material"
            color={schornColors.magenta}
          />
        </Text3D>
      </Center>

      <Text
        fontSize={fontSize.xl}
        color={schornColors.magenta}
        position={toPosition({
          positionTop: 2,
          positionRight: 3,
        })}
      >
        Score: {score}
      </Text>
      <ambientLight intensity={9} />

      <OrbitControls />

      <Spaceship />
      <FloorMemoized />
    </Canvas>
  );
}
