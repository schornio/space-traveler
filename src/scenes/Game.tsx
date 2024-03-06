import { useGameStore } from "../store/useGameStore";
import { Ground } from "../components/Ground";
import { memo, useEffect } from "react";
import { Spaceship } from "../components/3DModels/Spaceship";
import { Environment, OrbitControls } from "@react-three/drei";
import { Asteroids } from "../components/3DModels/Asteroids";
import { SphereBackground } from "../components/SphereBackground";

const COLLISION_TIME_INTERVAL = 1000;
const CHECK_LASER_HIT_INTERVAL = 100;
const TIME_TO_CREATE_ASTEROIDS = 5 * 1000;
const AsteroidMemo = memo(Asteroids);

export function Game() {
  const { isShipHitByAsteroid, isAsteroidHitByLaser, createAsteroids } =
    useGameStore((state) => ({
      isShipHitByAsteroid: state.isShipHitByAsteroid,
      isAsteroidHitByLaser: state.isAsteroidHitByLaser,
      createAsteroids: state.createAsteroids,
    }));

  useEffect(() => {
    const interval = setInterval(() => {
      isShipHitByAsteroid();
    }, COLLISION_TIME_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      isAsteroidHitByLaser();
    }, CHECK_LASER_HIT_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      createAsteroids(10);
    }, TIME_TO_CREATE_ASTEROIDS);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <group>
      <ambientLight intensity={9} />
      <Environment preset="city" />
      <SphereBackground />

      <OrbitControls />

      <Spaceship />
      <Ground />
      <AsteroidMemo />
    </group>
  );
}
