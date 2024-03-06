import { Center, Text3D } from "@react-three/drei";
import { useSceneStore } from "../../store/useSceneStore";
import { useCallback } from "react";
import { toPosition } from "../../utils/toPosition";

export function VRStart() {
  const nextScene = useSceneStore((state) => state.nextScene);

  const onInteraction = useCallback(() => {
    nextScene();
  }, []);

  return (
    <Center
      position={toPosition({
        positionIn: 0.5,
        positionRight: 0.5,
        positionTop: 1,
      })}
    >
      <Text3D font="space_age.json" onPointerEnter={onInteraction} scale={0.2}>
        Start
      </Text3D>
    </Center>
  );
}
