import { Center, Text3D } from "@react-three/drei";
import { useSceneStore } from "../../store/useSceneStore";
import { useCallback } from "react";
import { toPosition } from "../../utils/toPosition";
import { toRotation } from "../../utils/toRotation";
import { Logo3D } from "../../components/Logo3D";
import { useGameStore } from "../../store/useGameStore";

export function VRStart() {
  const nextScene = useSceneStore((state) => state.nextScene);
  const resetGame = useGameStore((state) => state.resetGame);

  const onInteraction = useCallback(() => {
    nextScene();
    resetGame();
  }, []);

  return (
    <>
      <Logo3D image="schornio_logo.png" positionIn={2.5} positionTop={2.5} />

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
          scale={0.08}
        >
          Start
        </Text3D>
      </Center>
    </>
  );
}
