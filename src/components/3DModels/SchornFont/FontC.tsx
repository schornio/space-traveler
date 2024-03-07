/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/schornFont/schornio_font_c.glb -t -T -o FontC.tsx 
Files: public/models/schornFont/schornio_font_c.glb [109.33KB] > C:\Users\mateu\OneDrive\Documentos\Coding\Schorn.io Codebase\space_traveler\schornio_font_c-transformed.glb [7.89KB] (93%)
*/

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { PATH_FONT_3D_MODELS } from "./path";
import { toPosition } from "../../../utils/toPosition";

type GLTFResult = GLTF & {
  nodes: {
    schornio_letters_2c: THREE.Mesh;
  };
  materials: {
    Schornio_material: THREE.MeshStandardMaterial;
  };
};

export function FontC() {
  const { nodes, materials } = useGLTF(
    `${PATH_FONT_3D_MODELS}/schornio_font_c-transformed.glb`
  ) as GLTFResult;

  return (
    <group
      dispose={null}
      position={toPosition({
        positionRight: 0.45,
        positionBottom: 0.1,
      })}
    >
      <mesh
        geometry={nodes.schornio_letters_2c.geometry}
        material={materials.Schornio_material}
      />
    </group>
  );
}

useGLTF.preload(`${PATH_FONT_3D_MODELS}/schornio_font_c-transformed.glb`);
