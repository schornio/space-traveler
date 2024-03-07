import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Position, toPosition } from "../../utils/toPosition";
import { Rotation, toRotation } from "../../utils/toRotation";
import { useRef } from "react";
import { DoubleSide, Group } from "three";

type Logo3DProps = {
  height?: number;
  width?: number;
  image: string;
} & Position &
  Rotation;

export function Logo3D({
  height = 0.5,
  width = 0.5,
  image,
  ...props
}: Logo3DProps) {
  const ref = useRef<Group>(null);
  const texture = useTexture(image);
  const { gl } = useThree();
  texture.anisotropy = gl.capabilities.getMaxAnisotropy();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
    }
  });

  return (
    <group position={toPosition(props)} rotation={toRotation(props)} ref={ref}>
      <mesh
        position={toPosition({
          positionOut: 0.001,
        })}
      >
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={1}
          side={DoubleSide}
        />
      </mesh>
    </group>
  );
}
