import { Text } from "@react-three/drei";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Group, Vector3 } from "three";
import { Position, toPosition } from "../../utils/toPosition";
import { Rotation, toRotation } from "../../utils/toRotation";
import { toSize } from "../../utils/toSize";
import { useInteractionHandlers } from "./useInteractionHandlers";
import { schornColors } from "../../constants/schornColors";

type ButtonColorVariant = "primary" | "secondary";

type ButtonVariantConfig = {
  backgroundColor?: string;
  textColor?: string;
};
const { royalBlue, white, magenta } = schornColors;
const buttonVariants: Record<ButtonColorVariant, ButtonVariantConfig> = {
  primary: {
    backgroundColor: royalBlue,
    textColor: white,
  },
  secondary: {
    backgroundColor: magenta,
    textColor: white,
  },
};

type ButtonProps = {
  children: ReactNode;
  colorVariant?: ButtonColorVariant;
  onPressStart?: () => void;
  onPressEnd?: () => void;
} & Position &
  Rotation;

const PRESS_DISTANCE = 0.01;
const COOLDOWN_TIME = 1000;
const BUTTON_DEPTH = 0.005;

export default function Button({
  children,
  colorVariant = "primary",
  onPressStart,
  onPressEnd,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<Group>(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsButtonEnabled(true);
    }, COOLDOWN_TIME);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handlePressing = useCallback(
    (state: string) => {
      if (buttonRef.current && isButtonEnabled) {
        const movementDirection = state === "down" ? -1 : 1;
        const movement = new Vector3(0, 0, PRESS_DISTANCE * movementDirection);
        movement.applyQuaternion(buttonRef.current.quaternion);
        buttonRef.current.position.add(movement);
      }
    },
    [isButtonEnabled]
  );

  const handlePress = useCallback(() => {
    if (isButtonEnabled) {
      handlePressing("down");
      onPressStart?.();
    }
  }, [handlePressing, onPressStart, isButtonEnabled]);

  const handleRelease = useCallback(() => {
    if (isButtonEnabled) {
      handlePressing("up");
      onPressEnd?.();
    }
  }, [handlePressing, onPressEnd, isButtonEnabled]);

  const handleInteraction = useInteractionHandlers({
    onControllerPress: handlePress,
    onControllerRelease: handleRelease,
    onHandPress: handlePress,
    onHandRelease: handleRelease,
  });

  const { backgroundColor, textColor } = buttonVariants[colorVariant];

  return (
    <group
      ref={buttonRef}
      position={toPosition(props)}
      rotation={toRotation(props)}
      {...handleInteraction}
    >
      <mesh>
        <boxGeometry
          args={toSize({
            sizeWidth: 0.1,
            sizeHeight: 0.1,
            sizeDepth: BUTTON_DEPTH,
          })}
        />
        <meshStandardMaterial
          color={backgroundColor}
          roughness={0.1}
          metalness={0.2}
          transparent
          opacity={0.5}
        />
      </mesh>
      <Text
        position={toPosition({
          positionOut: BUTTON_DEPTH / 2 + 0.001,
        })}
        fontSize={0.055}
        color={textColor}
        anchorX="center"
        anchorY="middle"
      >
        {children}
      </Text>
    </group>
  );
}
