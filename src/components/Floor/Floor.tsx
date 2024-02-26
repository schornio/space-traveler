import { useRef } from "react";
import { toPosition } from "../../utils/toPosition";
import { toRotation } from "../../utils/toRotation";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { schornColors } from "../../constants/schornColors";

const RADIUS = 100;
const HEIGHT = 1000;
const RADIUS_SEGMENTS = 64;

export function Floor() {
  const ref = useRef<Mesh | null>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.001;
    }
  });

  return (
    <mesh
      ref={ref}
      position={toPosition({
        positionIn: 10,
        positionBottom: 104,
      })}
      rotation={toRotation({
        rotationZInRad: Math.PI / 2,
      })}
    >
      <cylinderGeometry args={[RADIUS, RADIUS, HEIGHT, RADIUS_SEGMENTS]} />
      <meshStandardMaterial
        color={schornColors.magenta}
        wireframe
        opacity={0.8}
        transparent
      />
    </mesh>
  );
}
