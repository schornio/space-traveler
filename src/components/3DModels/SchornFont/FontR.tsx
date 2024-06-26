/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/schornFont/schornio_font_r.glb -t -T -o FontR.tsx 
Files: public/models/schornFont/schornio_font_r.glb [69.25KB] > C:\Users\mateu\OneDrive\Documentos\Coding\Schorn.io Codebase\space_traveler\schornio_font_r-transformed.glb [4.76KB] (93%)
*/

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { PATH_FONT_3D_MODELS } from "./path";
import { toPosition } from "../../../utils/toPosition";

type GLTFResult = GLTF & {
  nodes: {
    schornio_letters_5r: THREE.Mesh;
  };
  materials: {
    Schornio_material: THREE.MeshStandardMaterial;
  };
};

export function FontR() {
  const { nodes, materials } = useGLTF(
    `${PATH_FONT_3D_MODELS}/schornio_font_r-transformed.glb`
  ) as GLTFResult;

  return (
    <group
      dispose={null}
      position={toPosition({
        positionRight: 0.07,
        positionBottom: 0.05,
      })}
    >
      <mesh
        geometry={nodes.schornio_letters_5r.geometry}
        material={materials.Schornio_material}
      />
    </group>
  );
}

useGLTF.preload(`${PATH_FONT_3D_MODELS}/schornio_font_r-transformed.glb`);
