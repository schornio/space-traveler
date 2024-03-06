import { createRef } from "react";
import { Group } from "three";
import { AsteroidState } from "../store/useGameStore";

const INITIAL_DISTANCE = 50;
const SPREAD_WIDTH = 6;
const DEPTH = 100;
const HEIGHT_LIMIT = 6;
const MIN_ASTEROID_SIZE = 5;
const MAX_ASTEROID_SIZE = 20;

export function createAsteroids(quantity: number): AsteroidState[] {
  return Array.from({ length: quantity }, () => {
    const positionLeft = Math.random() * (SPREAD_WIDTH + 2) - SPREAD_WIDTH / 2;
    const positionIn = INITIAL_DISTANCE + Math.random() * DEPTH;
    const positionTop = Math.random() * HEIGHT_LIMIT - HEIGHT_LIMIT / 2;
    const scale = MIN_ASTEROID_SIZE + Math.random() * MAX_ASTEROID_SIZE;

    return {
      ref: createRef<Group>(),
      rotationSpeed: {
        y: Math.random() * 0.004,
        x: Math.random() * 0.002,
      },
      position: { positionLeft, positionTop, positionIn },
      size: scale,
      speed: Math.random() * 0.02 + 0.01,
      id: `${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .substring(2)}`,
    };
  });
}
