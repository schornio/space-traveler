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
import { useRef } from "react";

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
  };
  materials: {
    ["defaultMat.003"]: THREE.MeshStandardMaterial;
  };
};

export function Asteroid(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    `${PATH_3D_MODELS}/asteroidOptimized-transformed.glb`
  ) as GLTFResult;

  const ref = useRef<THREE.Mesh | null>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.004;
    }
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref}
        geometry={nodes.Object_2.geometry}
        material={materials["defaultMat.003"]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload(`${PATH_3D_MODELS}/asteroidOptimized-transformed.glb`);
