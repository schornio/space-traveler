import { Center, Text3D } from "@react-three/drei";
import { toPosition } from "../../utils/toPosition";
import { fontSize } from "../../utils/fontSizes";
import { useGameStore } from "../../store/useGameStore";
import { schornColors } from "../../constants/schornColors";
import { GAME_TEXT } from "../../constants/gameText";
import { useCountdownStore } from "../../store/useCountdownStore";
import { Logo3D } from "../Logo3D";
import { toRotation } from "../../utils/toRotation";

const TEXT_HEIGHT = 4.2;
const TEXT_DISTANCE = 5;

const FONT_WIDTH = 1;
const FONT_HEIGHT = 1.8;
const FONT_DEPTH = 0.3;

export function VRTextDisplay() {
  const { healthSpaceship, score } = useGameStore((state) => ({
    healthSpaceship: state.healthSpaceship,
    score: state.score,
  }));
  const secondsLeft = useCountdownStore((state) => state.secondsLeft);
  const { health, score: tScore, countdown } = GAME_TEXT;

  return (
    <group>
      <Logo3D
        image="schornio_logo.png"
        positionIn={TEXT_DISTANCE}
        positionTop={TEXT_HEIGHT + 1}
      />

      <Center
        position={toPosition({
          positionTop: TEXT_HEIGHT,
          positionIn: TEXT_DISTANCE,
          positionLeft: 1.5,
        })}
        rotation={toRotation({
          rotationXInDeg: 30,
        })}
      >
        <Text3D
          font="space_age.json"
          size={fontSize.lg}
          scale={[FONT_WIDTH, FONT_HEIGHT, FONT_DEPTH]}
        >
          {`${health}: ${healthSpaceship}`}
          <meshStandardMaterial color={schornColors.royalBlue} />
        </Text3D>
      </Center>

      <Center
        position={toPosition({
          positionTop: TEXT_HEIGHT,
          positionIn: TEXT_DISTANCE,
          positionLeft: 0.2,
        })}
        rotation={toRotation({
          rotationXInDeg: 30,
        })}
      >
        <Text3D
          font="space_age.json"
          size={fontSize.lg}
          scale={[FONT_WIDTH, FONT_HEIGHT, FONT_DEPTH]}
        >
          {`${tScore}: ${score}`}
          <meshStandardMaterial color={schornColors.royalBlue} />
        </Text3D>
      </Center>

      <Center
        position={toPosition({
          positionTop: TEXT_HEIGHT,
          positionIn: TEXT_DISTANCE,
          positionRight: 1.5,
        })}
        rotation={toRotation({
          rotationXInDeg: 30,
        })}
      >
        <Text3D
          font="space_age.json"
          size={fontSize.lg}
          scale={[FONT_WIDTH, FONT_HEIGHT, FONT_DEPTH]}
        >
          {`${countdown}: ${secondsLeft}`}
          <meshStandardMaterial color={schornColors.royalBlue} />
        </Text3D>
      </Center>
    </group>
  );
}
