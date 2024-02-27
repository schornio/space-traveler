/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 spaceshipOptimized.glb -t -T -o Spaceship.tsx 
Files: spaceshipOptimized.glb [18.75MB] > C:\Users\mateu\OneDrive\Documentos\Coding\Schorn.io Codebase\mobile_vr_experience\spaceshipOptimized-transformed.glb [166.62KB] (99%)
Author: Exiolite (https://sketchfab.com/Exiolite)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/spaceship-carelia-9f0b7bb00d6241ac80e772b79d6cecce
Title: SpaceShip "Carelia"
*/

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { toRotation } from "../../utils/toRotation";
import { toPosition } from "../../utils/toPosition";
import { PATH_3D_MODELS } from "./path";
import { Laser } from "./Laser";
import { useSpaceship } from "../../hooks/useSpaceship";
import { useGameStore } from "../../store/useGameStore";

type GLTFResult = GLTF & {
  nodes: {
    Cube001_Material007_0: THREE.Mesh;
    Cube001_Engines_0: THREE.Mesh;
    Cube001_Glass_0: THREE.Mesh;
    Cube001_Weapons_0: THREE.Mesh;
  };
  materials: {
    ["Material.007"]: THREE.MeshStandardMaterial;
    Engines: THREE.MeshStandardMaterial;
    Glass: THREE.MeshStandardMaterial;
    Weapons: THREE.MeshStandardMaterial;
  };
};

export function Spaceship() {
  const { nodes, materials } = useGLTF(
    `${PATH_3D_MODELS}/spaceshipOptimized-transformed.glb`
  ) as GLTFResult;
  const spaceshipRef = useGameStore((state) => state.spaceship.ref);
  const lasers = useSpaceship();

  return (
    <group>
      <group
        ref={spaceshipRef}
        dispose={null}
        scale={0.4}
        position={toPosition({
          positionBottom: 3,
          positionIn: 6,
        })}
        rotation={toRotation({
          rotationXInDeg: -10,
          rotationYInRad: -Math.PI / 2,
        })}
      >
        <mesh
          geometry={nodes.Cube001_Material007_0.geometry}
          material={materials["Material.007"]}
        />
        <mesh
          geometry={nodes.Cube001_Engines_0.geometry}
          material={materials.Engines}
        />
        <mesh
          geometry={nodes.Cube001_Glass_0.geometry}
          material={materials.Glass}
        />
        <mesh
          geometry={nodes.Cube001_Weapons_0.geometry}
          material={materials.Weapons}
        />
      </group>

      {lasers.map((laser) => (
        <Laser key={laser.id} id={laser.id} position={laser.position} />
      ))}
    </group>
  );
}

useGLTF.preload(`${PATH_3D_MODELS}/spaceshipOptimized-transformed.glb`);
