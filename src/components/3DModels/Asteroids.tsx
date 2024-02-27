/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 asteroidOptimized.glb -t -T -o Asteroid.tsx 
Files: asteroidOptimized.glb [20.01MB] > C:\Users\mateu\OneDrive\Documentos\Coding\Schorn.io Codebase\space_traveler\asteroidOptimized-transformed.glb [803.15KB] (96%)
Author: PeterMikielewicz (https://sketchfab.com/PeterMikielewicz)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/asteroid-with-minerals-1cf93f26dbc34a08a31367ea8929117f
Title: Asteroid with minerals
*/

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { PATH_3D_MODELS } from "./path";
import { useFrame } from "@react-three/fiber";
import { RefObject, createRef, useEffect, useState } from "react";
import { useGameStore } from "../../store/useGameStore";

const QUANTITY_ASTEROIDS = 200;

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
  };
  materials: {
    ["defaultMat.003"]: THREE.MeshStandardMaterial;
  };
};

type Asteroid = {
  ref: RefObject<THREE.Mesh>;
  rotationSpeed: {
    x: number;
    y: number;
  };
};

type AsteroidsProps = {
  floorRadius: number;
  floorWidth: number;
};

export function Asteroids({ floorRadius, floorWidth }: AsteroidsProps) {
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const setStoreAsteroidsRef = useGameStore((state) => state.setAsteroidsRef);

  const { nodes, materials } = useGLTF(
    `${PATH_3D_MODELS}/asteroidOptimized-transformed.glb`
  ) as GLTFResult;

  useEffect(() => {
    const asteroidsData = Array.from({ length: QUANTITY_ASTEROIDS }, () => ({
      ref: createRef<THREE.Mesh>(),
      rotationSpeed: {
        y: Math.random() * 0.004,
        x: Math.random() * 0.002,
      },
    }));

    setStoreAsteroidsRef(asteroidsData.map(({ ref }) => ref));

    setAsteroids(asteroidsData);
  }, []);

  useFrame(() => {
    asteroids.forEach(({ ref, rotationSpeed }) => {
      if (ref.current) {
        ref.current.rotation.x += rotationSpeed.x;
        ref.current.rotation.y += rotationSpeed.y;
      }
    });
  });

  return (
    <group>
      {asteroids.map(({ ref }, index) => {
        const positioningRadius = floorRadius + 10;
        const angle = Math.random() * Math.PI * 2;
        const height = (Math.random() * floorWidth) / 8;
        const positionX = Math.cos(angle) * positioningRadius;
        const positionZ = Math.sin(angle) * positioningRadius;
        const scale = Math.random() * 0.5 + 0.5;

        return (
          <mesh
            ref={ref}
            key={index}
            geometry={nodes.Object_2.geometry}
            material={materials["defaultMat.003"]}
            position={[positionX, height, positionZ]}
            scale={[scale, scale, scale]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        );
      })}
      ;
    </group>
  );
}
useGLTF.preload(`${PATH_3D_MODELS}/asteroidOptimized-transformed.glb`);
