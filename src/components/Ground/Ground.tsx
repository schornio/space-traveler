import { useRef } from "react";
import { toPosition } from "../../utils/toPosition";
import { toRotation } from "../../utils/toRotation";
import { DoubleSide, RepeatWrapping } from "three";
import { Plane, useTexture } from "@react-three/drei";
import textureBlueSrc from "/texture_blue.png";
import { useFrame } from "@react-three/fiber";

const SPEED_GROUND_MOVEMENT = 0.6;

export function Ground() {
  const textureBlue = useTexture(textureBlueSrc);
  const texturePurple = useTexture("/texture_purple.png");
  const offsetRef = useRef(0);
  textureBlue.wrapS = textureBlue.wrapT = RepeatWrapping;
  texturePurple.wrapS = texturePurple.wrapT = RepeatWrapping;
  texturePurple.repeat.set(1, 30);

  useFrame(() => {
    offsetRef.current += SPEED_GROUND_MOVEMENT * 0.01;
    textureBlue.offset.x = offsetRef.current;
    texturePurple.offset.y = offsetRef.current * 2;
  });

  return (
    <group>
      <Plane
        args={[1000, 1000, 1, 1]}
        rotation={toRotation({ rotationXInRad: -Math.PI / 2 })}
        position={toPosition({
          positionBottom: 4,
        })}
      >
        <meshStandardMaterial
          attach="material"
          map={texturePurple}
          side={DoubleSide}
        />
      </Plane>

      <Plane
        args={[1000, 10, 1, 1]}
        rotation={toRotation({
          rotationYInRad: Math.PI / 2,
        })}
        position={toPosition({
          positionLeft: 10,
        })}
      >
        <meshStandardMaterial
          attach="material"
          map={textureBlue}
          side={DoubleSide}
        />
      </Plane>

      <Plane
        args={[1000, 10, 1, 1]}
        rotation={toRotation({
          rotationYInRad: Math.PI / 2,
        })}
        position={toPosition({
          positionRight: 10,
        })}
      >
        <meshStandardMaterial
          attach="material"
          map={textureBlue}
          side={DoubleSide}
        />
      </Plane>

      {/* <Plane
        args={[1000, 1000, 1, 1]}
        rotation={toRotation({ rotationXInRad: -Math.PI / 2 })}
        position={toPosition({
          positionTop: 4,
        })}
      >
        <meshStandardMaterial
          attach="material"
          map={texturePurple}
          side={DoubleSide}
          // transparent
          // opacity={0.8}
        />
      </Plane> */}
    </group>
  );
}
