import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Group, Vector3 } from "three";
import { toRotation } from "../../utils/toRotation";
import { toPosition } from "../../utils/toPosition";
import { schornColors } from "../../constants/schornColors";

const SPEED = 1;

export type LaserProps = {
  id: string;
  position: Vector3;
};

const SPACESHIP_WIDTH = 5;

export function Laser({ id, position }: LaserProps) {
  const ref = useRef<Group>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.position.copy(position);
    }
  }, [position]);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.z -= SPEED;
    }
  });

  return (
    <group
      ref={ref}
      rotation={toRotation({
        rotationXInRad: Math.PI / 2,
      })}
      userData={{ id }}
    >
      {/* Left */}
      <mesh
        position={toPosition({
          positionLeft: SPACESHIP_WIDTH / 2,
        })}
      >
        <cylinderGeometry args={[0.1, 0.1, 5, 32]} />
        <meshBasicMaterial color={schornColors.purpleMagenta} />
      </mesh>

      {/* Right */}
      <mesh
        position={toPosition({
          positionRight: SPACESHIP_WIDTH / 2,
        })}
      >
        <cylinderGeometry args={[0.1, 0.1, 5, 32]} />
        <meshBasicMaterial color={schornColors.purpleMagenta} />
      </mesh>
    </group>
  );
}
