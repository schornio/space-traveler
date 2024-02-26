import { useRef } from "react";
import { toPosition } from "../../utils/toPosition";
import { toRotation } from "../../utils/toRotation";
import { Group, Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { schornColors } from "../../constants/schornColors";

const RADIUS = 100;
const WIDTH = 400;
const RADIUS_SEGMENTS = 20;

const QUANTITY_ASTEROIDS = 50;

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
        <cylinderGeometry args={[RADIUS, RADIUS, WIDTH, RADIUS_SEGMENTS]} />
        <meshStandardMaterial
          color={schornColors.magenta}
          wireframe
          opacity={0.8}
          transparent
        />
      </mesh>

      <AbstractAsteroids />
    </group>
  );
}

function AbstractAsteroids() {
  const ref = useRef<Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.1;
      ref.current.rotation.x += 0.1;
    }
  });

  return (
    <group>
      {Array.from({ length: QUANTITY_ASTEROIDS }).map((_, index) => {
        const positioningRadius = RADIUS + 10;
        const angle = Math.random() * Math.PI * 2;
        const height = (Math.random() * WIDTH) / 8;
        const positionX = Math.cos(angle) * positioningRadius;
        const positionZ = Math.sin(angle) * positioningRadius;
        const scale = Math.random() * 0.5 + 0.5;

        return (
          <mesh
            ref={ref}
            key={index}
            position={[positionX, height, positionZ]}
            scale={[scale, scale, scale]}
          >
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={schornColors.royalBlue} />
          </mesh>
        );
      })}
    </group>
  );
}
