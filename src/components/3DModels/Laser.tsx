import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";
import { toRotation } from "../../utils/toRotation";
import { toPosition } from "../../utils/toPosition";
import { schornColors } from "../../constants/schornColors";

const SPEED = 1;

export function Laser() {
  const ref = useRef<Group | null>(null);
  useFrame(() => {
    if (ref.current) {
      ref.current.position.x -= SPEED;
    }
  });

  return (
    <group
      ref={ref}
      position={toPosition({
        positionTop: 0.1,
        positionLeft: 4,
      })}
      rotation={toRotation({
        rotationXInRad: Math.PI / 2,
        rotationZInRad: Math.PI / 2,
      })}
    >
      {/* Left */}
      <mesh
        position={toPosition({
          positionLeft: 6,
        })}
      >
        <cylinderGeometry args={[0.1, 0.1, 5, 32]} />
        <meshBasicMaterial color={schornColors.purpleMagenta} />
      </mesh>

      {/* Right */}
      <mesh
        position={toPosition({
          positionRight: 6,
        })}
      >
        <cylinderGeometry args={[0.1, 0.1, 5, 32]} />
        <meshBasicMaterial color={schornColors.purpleMagenta} />
      </mesh>
    </group>
  );
}
