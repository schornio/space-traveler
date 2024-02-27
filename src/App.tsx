import { Canvas } from "@react-three/fiber";
import "./globals.css";
import { OrbitControls, Text } from "@react-three/drei";
import { Spaceship } from "./components/3DModels/Spaceship";
import { Floor } from "./components/Floor";
import { useGameStore } from "./store/useGameStore";
import { memo, useEffect, useRef, useState } from "react";
import { fontSize } from "./utils/fontSizes";
import { schornColors } from "./constants/schornColors";

const FloorMemoized = memo(Floor);

function App() {
  const isShipHitByAsteroid = useGameStore(
    (state) => state.isShipHitByAsteroid
  );
  const isAsteroidHitByLaser = useGameStore(
    (state) => state.isAsteroidHitByLaser
  );
  const cleanUpOldLasers = useGameStore((state) => state.cleanUpLasersRef);

  const [shipHit, setShipHit] = useState(false);
  const [asteroidHit, setAsteroidHit] = useState(false);

  useEffect(() => {
    setInterval(() => {
      const { isHit: isShipHit } = isShipHitByAsteroid();
      const { isHit: isAsteroidHit } = isAsteroidHitByLaser();

      // if (isShipHit) {
      //   setShipHit(true);

      //   setTimeout(() => {
      //     setShipHit(false);
      //   }, 300);
      // }

      if (isAsteroidHit) {
        setAsteroidHit(true);

        setTimeout(() => {
          setAsteroidHit(false);
        }, 300);
      }

      cleanUpOldLasers();
    }, 400);
  }, [isShipHitByAsteroid]);

  return (
    <Canvas>
      {/* {shipHit && (
        <Text fontSize={fontSize.lg} color={schornColors.purpleMagenta}>
          spaceship collided with asteroid
        </Text>
      )} */}

      {asteroidHit && (
        <Text fontSize={fontSize.lg} color={schornColors.purpleMagenta}>
          asteroid hit by laser
        </Text>
      )}
      <ambientLight intensity={9} />

      <OrbitControls />

      <Spaceship />
      <FloorMemoized />
    </Canvas>
  );
}

export default App;
