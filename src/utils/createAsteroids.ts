import { createRef } from "react";
import { Mesh } from "three";
import { FLOOR_RADIUS, FLOOR_WIDTH } from "../components/Floor";
import { AsteroidState } from "../store/useGameStore";

export function createAsteroids(quantity: number): AsteroidState[] {
  return Array.from({ length: quantity }, () => {
    const positioningRadius = FLOOR_RADIUS + 10;
    const angle = Math.random() * Math.PI * 2;
    const positionTop = (Math.random() * FLOOR_WIDTH) / 10;
    const positionLeft = Math.cos(angle) * positioningRadius;
    const positionIn = Math.sin(angle) * positioningRadius;
    const scale = Math.random() * 1.5;

    return {
      ref: createRef<Mesh>(),
      rotationSpeed: {
        y: Math.random() * 0.004,
        x: Math.random() * 0.002,
      },
      position: { positionLeft, positionTop, positionIn },
      size: scale,
      isDestroyed: false,
      id: Math.random().toString(36).substring(7),
    };
  });
}
