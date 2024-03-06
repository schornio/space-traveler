import { useLoader } from "@react-three/fiber";
import { DoubleSide, TextureLoader } from "three";
import galaxyBg from "/galaxy_2.jpg";
import { RotationRad, toRotation } from "../../utils/toRotation";

export function SphereBackground() {
  const texture = useLoader(TextureLoader, galaxyBg);

  return (
    <group>
      <mesh
        scale={[-1, 1, 1]}
        rotation={toRotation({
          rotationYInRad: -RotationRad.QUARTER,
        })}
      >
        <sphereGeometry args={[500, 120, 80]} />
        <meshBasicMaterial side={DoubleSide} map={texture} />
      </mesh>
    </group>
  );
}
