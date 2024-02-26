import { Canvas } from "@react-three/fiber";
import "./globals.css";
import { OrbitControls, Text } from "@react-three/drei";
import { Spaceship } from "./components/3DModels/Spaceship";
import { Floor } from "./components/Floor";
import { Asteroid } from "./components/3DModels/Asteroid";
import { toPosition } from "./utils/toPosition";
import { useGameStore } from "./store/useGameStore";
import { useEffect, useState } from "react";

function App() {
  const checkCollisionLaserWithAsteroid = useGameStore(
    (state) => state.checkCollisionLaserWithAsteroid
  );
  const [isCollided, setIsCollided] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const { isCollision } = checkCollisionLaserWithAsteroid();
      if (isCollision) {
        setIsCollided(true);

        setTimeout(() => {
          setIsCollided(false);
        }, 500);
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [checkCollisionLaserWithAsteroid]);

  return (
    <Canvas>
      {isCollided && <Text>collided</Text>}

      <ambientLight intensity={9} />

      <OrbitControls />

      <Spaceship />
      {/* <Asteroid /> */}
      <Floor />
    </Canvas>
  );
}

export default App;
