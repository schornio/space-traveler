import { Center, Text3D } from "@react-three/drei";
import { useGameStore } from "../../store/useGameStore";
import { GAME_TEXT } from "../../constants/gameText";
import { useCallback } from "react";
import { useSceneStore } from "../../store/useSceneStore";
import { Logo3D } from "../../components/Logo3D";
import { toPosition } from "../../utils/toPosition";
import { schornColors } from "../../constants/schornColors";
import { toRotation } from "../../utils/toRotation";

export function VREnd() {
  const nextScene = useSceneStore((state) => state.nextScene);
  const score = useGameStore((state) => state.score);
  const { yourScore, thankYou, gameName, goBack } = GAME_TEXT;

  const onInteraction = useCallback(() => {
    nextScene();
  }, []);

  return (
    <group>
      <Logo3D image="schornio_logo.png" positionIn={2.5} positionTop={2.5} />

      <Center
        position={toPosition({
          positionIn: 2,
          positionTop: 1.8,
        })}
      >
        <Text3D
          font="space_age.json"
          position={[0, 1, 0]}
          onPointerEnter={onInteraction}
          scale={0.1}
        >
          {yourScore}: {score}
        </Text3D>
      </Center>

      <Center
        position={toPosition({
          positionIn: 2,
          positionTop: 1.5,
        })}
      >
        <Text3D
          font="space_age.json"
          position={[0, 1, 0]}
          onPointerEnter={onInteraction}
          scale={0.1}
        >
          {thankYou}
        </Text3D>
      </Center>

      <Center
        position={toPosition({
          positionIn: 2,
          positionTop: 1.2,
        })}
      >
        <Text3D
          font="space_age.json"
          position={[0, 1, 0]}
          onPointerEnter={onInteraction}
          scale={0.1}
        >
          {gameName}
          <meshStandardMaterial color={schornColors.magenta} />
        </Text3D>
      </Center>

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
          {goBack}
        </Text3D>
      </Center>
    </group>
  );
}
