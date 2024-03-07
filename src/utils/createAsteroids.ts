import { createRef } from "react";
import { Group } from "three";
import { AsteroidState } from "../store/useGameStore";
import { GROUND_HEIGHT, WALLS_WIDTH } from "../components/Ground";

const INITIAL_DISTANCE = 50;
const DEPTH = 100;
const MIN_ASTEROID_SIZE = 5;
const MAX_ASTEROID_SIZE = 15;

const BOTTOM_BOUND = GROUND_HEIGHT - 1;
const TOP_BOUND = -GROUND_HEIGHT / 2;

const LEFT_BOUND = WALLS_WIDTH / 4;
const RIGHT_BOUND = -WALLS_WIDTH / 4;

export function createAsteroids(quantity: number): AsteroidState[] {
  return Array.from({ length: quantity }, () => {
    const positionLeft =
      LEFT_BOUND + Math.random() * (RIGHT_BOUND - LEFT_BOUND);
    const positionBottom =
      BOTTOM_BOUND + Math.random() * (TOP_BOUND - BOTTOM_BOUND);

    const positionIn = INITIAL_DISTANCE + Math.random() * DEPTH;
    const scale = MIN_ASTEROID_SIZE + Math.random() * MAX_ASTEROID_SIZE;

    return {
      ref: createRef<Group>(),
      rotationSpeed: {
        y: Math.random() * 0.004,
        x: Math.random() * 0.002,
      },
      position: { positionLeft, positionBottom, positionIn },
      size: scale,
      speed: Math.random() * 0.02 + 0.01,
      id: `${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .substring(2)}`,
    };
  });
}
