import { useRef } from "react";
import { toPosition } from "../../utils/toPosition";
import { toRotation } from "../../utils/toRotation";
import { RepeatWrapping } from "three";
import { Plane, useTexture } from "@react-three/drei";
import textureBlueSrc from "/texture_blue.png";
import { useFrame } from "@react-three/fiber";
import { schornColors } from "../../constants/schornColors";

const SPEED_GROUND_MOVEMENT = 1;

export function Ground() {
  const textureBlue = useTexture(textureBlueSrc);
  const offsetRef = useRef(0);
  textureBlue.wrapS = textureBlue.wrapT = RepeatWrapping;
  textureBlue.repeat.set(100, 100);

  useFrame(() => {
    offsetRef.current += SPEED_GROUND_MOVEMENT * 0.01;
    textureBlue.offset.y = offsetRef.current;
  });

  return (
    <group>
      <Plane
        args={[1000, 1000, 1, 1]}
        rotation={toRotation({ rotationXInRad: -Math.PI / 2 })}
        position={toPosition({
          positionBottom: 5,
        })}
      >
        <meshStandardMaterial attach="material" map={textureBlue} />
      </Plane>

      <mesh
        position={toPosition({
          positionLeft: 10,
        })}
      >
        <boxGeometry args={[1, 10, 1000]} />
        <meshStandardMaterial color={schornColors.royalBlue} />
      </mesh>

      <mesh
        position={toPosition({
          positionRight: 10,
        })}
      >
        <boxGeometry args={[1, 10, 1000]} />
        <meshStandardMaterial color={schornColors.royalBlue} />
      </mesh>
    </group>
  );
}
