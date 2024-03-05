import { createRef } from "react";
import { Mesh } from "three";
import { AsteroidState } from "../store/useGameStore";

export function createAsteroids(quantity: number): AsteroidState[] {
  const initialZ = 20;
  const spreadWidth = 15;
  const depth = 100;

  return Array.from({ length: quantity }, () => {
    const positionLeft = Math.random() * spreadWidth - spreadWidth / 2; // Spread width evenly across left and right
    const positionIn = initialZ + Math.random() * depth;
    const positionTop = (Math.random() * 10) / 2; // Spread height evenly across top and bottom
    const scale = Math.random() * 1.5 + 0.5; // Ensure minimum size

    return {
      ref: createRef<Mesh>(),
      rotationSpeed: {
        y: Math.random() * 0.004,
        x: Math.random() * 0.002,
      },
      position: { positionLeft, positionTop, positionIn },
      size: scale,
      speed: Math.random() * 0.02 + 0.01, // Ensure a minimum speed
      id: Math.random().toString(36).substring(7),
    };
  });
}
