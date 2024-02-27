import { createRef } from "react";
import { SpaceshipState } from "../store/useGameStore";
import { Group } from "three";

export function createSpaceship(): SpaceshipState {
  return {
    ref: createRef<Group>(),
    position: {
      positionBottom: 3,
      positionIn: 6,
    },
    rotation: {
      rotationXInDeg: -10,
      rotationYInRad: -Math.PI / 2,
    },
  };
}
