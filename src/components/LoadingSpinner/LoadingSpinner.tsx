import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Mesh, Group, MeshStandardMaterial, Vector3 } from "three";
import Color from "color";
import { schornColors } from "../../constants/schornColors";
import { toPosition } from "../../utils/toPosition";

const NUM_SPOKES = 6;
const RADIUS = 0.2;
const CYCLE_DURATION = 5;
const SPIN_SPEED = 0.4;

export function LoadingSpinner() {
  const groupRef = useRef<Group>(null);
  const meshRefs = useRef<(Mesh | null)[]>([]);

  const positions = useMemo(() => {
    return [...Array(NUM_SPOKES)].map((_, i) => {
      const angle = (i / NUM_SPOKES) * Math.PI * 2;
      return new Vector3(Math.cos(angle) * RADIUS, Math.sin(angle) * RADIUS, 0);
    });
  }, []);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const phase =
      (Math.sin(
        ((elapsedTime % CYCLE_DURATION) / CYCLE_DURATION) * Math.PI * 2
      ) +
        1) /
      2;
    const currentColor = Color(schornColors.royalBlue)
      .mix(Color(schornColors.magenta), phase)
      .hex();

    if (groupRef.current) {
      groupRef.current.rotation.z = elapsedTime * SPIN_SPEED;
    }

    if (meshRefs.current) {
      meshRefs.current.forEach((mesh) => {
        if (mesh) {
          if (mesh.material instanceof MeshStandardMaterial) {
            mesh.material.color.set(currentColor);
          }
        }
      });
    }
  });

  return (
    <group
      ref={groupRef}
      position={toPosition({
        positionIn: 1,
        positionTop: 1.4,
      })}
    >
      {positions.map((position, i) => (
        <mesh
          key={i}
          position={position}
          ref={(el) => {
            if (meshRefs.current) {
              meshRefs.current[i] = el;
            }
          }}
        >
          <octahedronGeometry args={[0.05, 0]} />
          <meshStandardMaterial color={schornColors.royalBlue} />
        </mesh>
      ))}
    </group>
  );
}
