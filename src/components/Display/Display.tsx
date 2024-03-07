import { RoundedBox, Text } from "@react-three/drei";
import { Position, toPosition } from "../../utils/toPosition";
import { Rotation, toRotation } from "../../utils/toRotation";
import { toSize } from "../../utils/toSize";
import { schornColors } from "../../constants/schornColors";
import { fontSize } from "../../utils/fontSizes";

export type DisplayProps = {
  text?: string | number;
} & Position &
  Rotation;

export function Display({ text, ...props }: DisplayProps) {
  return (
    <group position={toPosition(props)} rotation={toRotation(props)}>
      {/* Display Background */}
      <RoundedBox
        args={toSize({
          sizeDepth: 0.1,
          sizeHeight: 0.25,
          sizeWidth: 0.5,
        })}
      >
        <meshStandardMaterial
          color={schornColors.royalBlue}
          roughness={0.8}
          metalness={0.2}
        />
      </RoundedBox>

      <Text
        position={toPosition({
          positionOut: 0.06,
        })}
        fontSize={fontSize.md}
        color={schornColors.white}
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
}
