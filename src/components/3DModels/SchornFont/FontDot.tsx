/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/schornFont/schornio_font_dot.glb -t -T -o FontDot.tsx 
Files: public/models/schornFont/schornio_font_dot.glb [23.42KB] > C:\Users\mateu\OneDrive\Documentos\Coding\Schorn.io Codebase\space_traveler\schornio_font_dot-transformed.glb [2.92KB] (88%)
*/

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { PATH_FONT_3D_MODELS } from "./path";

type GLTFResult = GLTF & {
  nodes: {
    schornio_letters_7: THREE.Mesh;
  };
  materials: {
    Schornio_material: THREE.MeshStandardMaterial;
  };
};

export function FontDot() {
  const { nodes, materials } = useGLTF(
    `${PATH_FONT_3D_MODELS}/schornio_font_dot-transformed.glb`
  ) as GLTFResult;

  return (
    <group dispose={null}>
      <mesh
        geometry={nodes.schornio_letters_7.geometry}
        material={materials.Schornio_material}
      />
    </group>
  );
}

useGLTF.preload(`${PATH_FONT_3D_MODELS}/schornio_font_dot-transformed.glb`);