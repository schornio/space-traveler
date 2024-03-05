import { useLoader } from "@react-three/fiber";
import { BackSide, TextureLoader } from "three";
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
        {/* original radius 500 */}
        <sphereGeometry args={[2000, 120, 80]} />
        <meshBasicMaterial side={BackSide} map={texture} />
      </mesh>

      {/* <SphereOverlay /> */}
    </group>
  );
}

function SphereOverlay({ opacity = 0.5 }: { opacity?: number }) {
  return (
    <mesh>
      <sphereGeometry args={[9, 32, 32]} />
      <meshBasicMaterial
        color="black"
        side={BackSide}
        opacity={opacity}
        transparent
      />
    </mesh>
  );
}
