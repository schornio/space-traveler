import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Group, Vector3 } from "three";
import { toRotation } from "../../utils/toRotation";
import { toPosition } from "../../utils/toPosition";
import { schornColors } from "../../constants/schornColors";
import { useGameStore } from "../../store/useGameStore";

const SPEED = 1;

export type LaserProps = {
  id: string;
  position: Vector3;
};

const SPACESHIP_WIDTH = 1;

export function Laser({ id, position }: LaserProps) {
  const ref = useRef<Group>(null);
  const setStoreLasersRef = useGameStore((state) => state.setLasersRef);

  useEffect(() => {
    if (ref.current) {
      ref.current.position.copy(position);
    }

    setStoreLasersRef(id, ref);
  }, [position]);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.z -= SPEED;
    }
  });

  return (
    <group
      ref={ref}
      position={toPosition({
        positionTop: position.y,
        positionRight: position.x,
        positionOut: position.z,
      })}
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
