import { Canvas } from "@react-three/fiber";
import "./globals.css";
import { OrbitControls, Text } from "@react-three/drei";
import { Spaceship } from "./components/3DModels/Spaceship";
import { Floor } from "./components/Floor";
import { Asteroid } from "./components/3DModels/Asteroid";
import { toPosition } from "./utils/toPosition";
import { useGameStore } from "./store/useGameStore";
import { memo, useEffect, useRef, useState } from "react";
import { fontSize } from "./utils/fontSizes";

const FloorMemoized = memo(Floor);

function App() {
  const checkCollisionLaserWithAsteroid = useGameStore(
    (state) => state.checkCollisionLaserWithAsteroid
  );
  const [isCollided, setIsCollided] = useState(false);

  useEffect(() => {
    setInterval(() => {
      const { isCollision } = checkCollisionLaserWithAsteroid();

      if (isCollision) {
        setIsCollided(true);

        setTimeout(() => {
          setIsCollided(false);
        }, 200);
      }
    }, 1000);
  }, [checkCollisionLaserWithAsteroid]);

  // console.log("isCollided", isCollided);

  return (
    <Canvas>
      {isCollided && <Text fontSize={fontSize.lg}>collision</Text>}
      <ambientLight intensity={9} />

      <OrbitControls />

      <Spaceship />
      {/* <Asteroid /> */}
      {/* <Floor /> */}
      <FloorMemoized />
    </Canvas>
  );
}

export default App;
