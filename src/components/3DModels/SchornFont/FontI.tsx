/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/schornFont/schornio_font_i.glb -t -T -o FontI.tsx 
Files: public/models/schornFont/schornio_font_i.glb [56.82KB] > C:\Users\mateu\OneDrive\Documentos\Coding\Schorn.io Codebase\space_traveler\schornio_font_i-transformed.glb [3.91KB] (93%)
*/

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { PATH_FONT_3D_MODELS } from "./path";

type GLTFResult = GLTF & {
  nodes: {
    schornio_letters_8i: THREE.Mesh;
  };
  materials: {
    Schornio_material: THREE.MeshStandardMaterial;
  };
};

export function FontI() {
  const { nodes, materials } = useGLTF(
    `${PATH_FONT_3D_MODELS}/schornio_font_i-transformed.glb`
  ) as GLTFResult;

  return (
    <group dispose={null}>
      <mesh
        geometry={nodes.schornio_letters_8i.geometry}
        material={materials.Schornio_material}
      />
    </group>
  );
}

useGLTF.preload(`${PATH_FONT_3D_MODELS}/schornio_font_i-transformed.glb`);
