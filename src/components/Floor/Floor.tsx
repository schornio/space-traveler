import { useRef } from "react";
import { toPosition } from "../../utils/toPosition";
import { toRotation } from "../../utils/toRotation";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";
import { schornColors } from "../../constants/schornColors";
import { Asteroids } from "../3DModels/Asteroids";

export const FLOOR_RADIUS = 100;
export const FLOOR_WIDTH = 400;
const RADIUS_SEGMENTS = 20;

export function Floor() {
  const ref = useRef<Group>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.001;
    }
  });

  return (
    <group
      ref={ref}
      position={toPosition({
        // positionIn: 10,
        positionBottom: 110,
        positionRight: 25,
      })}
      rotation={toRotation({
        rotationZInRad: Math.PI / 2,
      })}
    >
      <mesh>
        <cylinderGeometry
          args={[FLOOR_RADIUS, FLOOR_RADIUS, FLOOR_WIDTH, RADIUS_SEGMENTS]}
        />
        <meshStandardMaterial
          color={schornColors.magenta}
          wireframe
          opacity={0.8}
          transparent
        />
      </mesh>

      <Asteroids />
    </group>
  );
}
