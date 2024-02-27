import { Canvas } from "@react-three/fiber";
import "./globals.css";
import { Center, OrbitControls, Text, Text3D } from "@react-three/drei";
import { Spaceship } from "./components/3DModels/Spaceship";
import { Floor } from "./components/Floor";
import { useGameStore } from "./store/useGameStore";
import { memo, useEffect } from "react";
import { fontSize } from "./utils/fontSizes";
import { schornColors } from "./constants/schornColors";
import { toPosition } from "./utils/toPosition";

const COLLISION_TIME_INTERVAL = 500;

const FloorMemoized = memo(Floor);

function App() {
  const { healthSpaceship, score, isShipHitByAsteroid } = useGameStore(
    (state) => ({
      isShipHitByAsteroid: state.isShipHitByAsteroid,
      healthSpaceship: state.healthSpaceship,
      score: state.score,
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      isShipHitByAsteroid();
    }, COLLISION_TIME_INTERVAL);

    return () => clearInterval(interval);
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

export default App;
