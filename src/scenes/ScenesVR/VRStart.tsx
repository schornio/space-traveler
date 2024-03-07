import { Center, Environment, Text3D } from "@react-three/drei";
import { useSceneStore } from "../../store/useSceneStore";
import { useCallback } from "react";
import { toPosition } from "../../utils/toPosition";
import { toRotation } from "../../utils/toRotation";

export function VRStart() {
  const nextScene = useSceneStore((state) => state.nextScene);

  const onInteraction = useCallback(() => {
    nextScene();
  }, []);

  return (
    <>
      <ambientLight intensity={9} />
      <Environment preset="city" />
      <Center
        position={toPosition({
          positionIn: 0.5,
          positionTop: 1.3,
        })}
        rotation={toRotation({
          rotationXInDeg: -30,
        })}
      >
        <Text3D
          font="space_age.json"
          onPointerEnter={onInteraction}
          scale={0.1}
        >
          Start
        </Text3D>
      </Center>
    </>
  );
}
