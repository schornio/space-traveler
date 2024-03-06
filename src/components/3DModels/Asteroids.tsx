import { useFrame } from "@react-three/fiber";
import { useGameStore } from "../../store/useGameStore";
import { toPosition } from "../../utils/toPosition";
import { FontRandomSelector } from "./SchornFont/FontRandomSelector";
import { memo } from "react";

const FontSelectorMemoized = memo(FontRandomSelector);

export function Asteroids() {
  const asteroids = useGameStore((state) => state.asteroids);

  useFrame(() => {
    asteroids.forEach(({ ref }) => {
      if (ref.current) {
        ref.current.position.z += 0.4;
      }
    });
  });

  return (
    <group>
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
