import { useFrame } from "@react-three/fiber";
import { useGameStore } from "../../store/useGameStore";
import { toPosition } from "../../utils/toPosition";
import { FontRandomSelector } from "./SchornFont/FontRandomSelector";
import { memo } from "react";
import { SPEED_GROUND_MOVEMENT, WALLS_WIDTH } from "../Ground";

const FontSelectorMemoized = memo(FontRandomSelector);

export function Asteroids() {
  const asteroids = useGameStore((state) => state.asteroids);

  useFrame(() => {
    asteroids.forEach(({ ref }) => {
      if (ref.current) {
        ref.current.position.z += SPEED_GROUND_MOVEMENT;
      }
    });
  });

  return (
    <group
      position={toPosition({
        positionLeft: WALLS_WIDTH / 3,
      })}
    >
      {asteroids.map(({ position, size, ref, id }) => {
        return (
          <group
            position={toPosition(position)}
            ref={ref}
            scale={size}
            key={id}
          >
            <FontSelectorMemoized />
          </group>
        );
      })}
    </group>
  );
}
