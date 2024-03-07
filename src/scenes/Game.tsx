import { useGameStore } from "../store/useGameStore";
import { Ground } from "../components/Ground";
import { memo, useEffect } from "react";
import { Spaceship } from "../components/3DModels/Spaceship";
import { Asteroids } from "../components/3DModels/Asteroids";
import { useCountdownStore } from "../store/useCountdownStore";
import { useSceneStore } from "../store/useSceneStore";
import { OrbitControls } from "@react-three/drei";

const COLLISION_TIME_INTERVAL = 100;
const TIME_TO_CREATE_ASTEROIDS = 2 * 1000;
const GAME_DURATION_IN_SECONDS = 60;

const AsteroidMemo = memo(Asteroids);

export function Game() {
  const { isShipHitByAsteroid, isAsteroidHitByLaser, createAsteroids } =
    useGameStore((state) => ({
      isShipHitByAsteroid: state.isShipHitByAsteroid,
      isAsteroidHitByLaser: state.isAsteroidHitByLaser,
      createAsteroids: state.createAsteroids,
    }));
  const nextScene = useSceneStore((state) => state.nextScene);
  const startCountdown = useCountdownStore((state) => state.startCountdown);

  useEffect(() => {
    const cleanup = startCountdown(GAME_DURATION_IN_SECONDS, () => {
      nextScene();
    });

    return () => {
      cleanup();
    };
  }, [startCountdown]);

  useEffect(() => {
    const interval = setInterval(() => {
      isShipHitByAsteroid();
      isAsteroidHitByLaser();
    }, COLLISION_TIME_INTERVAL);

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
      <OrbitControls />
      <Spaceship />
      <Ground />
      <AsteroidMemo />
    </group>
  );
}
