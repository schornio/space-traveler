import { RefObject, createRef, useEffect, useRef, useState } from "react";
import { toPosition } from "../../utils/toPosition";
import { toRotation } from "../../utils/toRotation";
import { Group, Mesh, Object3D } from "three";
import { useFrame } from "@react-three/fiber";
import { schornColors } from "../../constants/schornColors";
import { useGameStore } from "../../store/useGameStore";
import { useGLTF } from "@react-three/drei";
import { PATH_3D_MODELS } from "../3DModels/path";
import { GLTF } from "three-stdlib";
import { Asteroids } from "../3DModels/Asteroids";

const RADIUS = 100;
const WIDTH = 400;
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
        <cylinderGeometry args={[RADIUS, RADIUS, WIDTH, RADIUS_SEGMENTS]} />
        <meshStandardMaterial
          color={schornColors.magenta}
          wireframe
          opacity={0.8}
          transparent
        />
      </mesh>

      <Asteroids floorRadius={RADIUS} floorWidth={WIDTH} />
    </group>
  );
}
