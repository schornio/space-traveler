import { useFBO, useGLTF } from "@react-three/drei";
import { PATH_FONT_3D_MODELS } from "./path";
import { GLTF } from "three-stdlib";
import { AsteroidState } from "../../../store/useGameStore";
import { Position } from "../../../utils/toPosition";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

type GLTFResultFontC = GLTF & {
  nodes: {
    schornio_letters_2c: THREE.Mesh;
  };
  materials: {
    Schornio_material: THREE.MeshStandardMaterial;
  };
};

type GLTFResultFontDot = GLTF & {
  nodes: {
    schornio_letters_7: THREE.Mesh;
  };
  materials: {
    Schornio_material: THREE.MeshStandardMaterial;
  };
};

type GLTFResultFontH = GLTF & {
  nodes: {
    schornio_letters_3h: THREE.Mesh;
  };
  materials: {
    Schornio_material: THREE.MeshStandardMaterial;
  };
};

export function TestFont({
  position,
  size,
}: {
  position: Position;
  size: number;
}) {
  const { nodes: fontCNodes, materials: fontCMaterials } = useGLTF(
    `${PATH_FONT_3D_MODELS}/schornio_font_c-transformed.glb`
  ) as GLTFResultFontC;
  const { nodes: fontDotNodes, materials: fontDotMaterials } = useGLTF(
    `${PATH_FONT_3D_MODELS}/schornio_font_dot-transformed.glb`
  ) as GLTFResultFontDot;
  const { nodes: fontHNodes, materials: fontHMaterials } = useGLTF(
    `${PATH_FONT_3D_MODELS}/schornio_font_h-transformed.glb`
  ) as GLTFResult;

  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += 1;
    }
  });

  return (
    <group dispose={null} ref={ref}>
      <mesh
        geometry={fontCNodes.schornio_letters_2c.geometry}
        material={fontCMaterials.Schornio_material}
      />
    </group>
  );
}
