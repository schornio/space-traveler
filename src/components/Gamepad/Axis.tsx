import { FC, useState } from "react";
import { useXRGamepadReader } from "@coconut-xr/natuerlich/react";
import { useFrame } from "@react-three/fiber";
import { Container, Text, noAnimation } from "@coconut-xr/koestlich";
import { COLORS } from "../colors";

export const Axis: FC<{ inputSource: XRInputSource; button: string }> = ({
  button,
  inputSource,
}) => {
  const reader = useXRGamepadReader(inputSource);
  const [value, setValue] = useState(0);
  const [state, setState] = useState(null);

  useFrame(() => {
    setState(reader.readButtonState(button));
    setValue(reader.readButtonValue(button));
  });

  return (
    <Container>
      <Text fontSize={20} animation={noAnimation}>
        {button}
      </Text>
      <Container
        backgroundColor={0xffffff}
        backgroundOpacity={0.5}
        width={200}
        height={10}
        alignItems="center"
        justifyContent="center"
        borderRadius={5}
      >
        <Container
          width={12}
          height={12}
          backgroundColor={COLORS[state]}
          animation={noAnimation}
          borderRadius={6}
          positionLeft={value * 200 - 100}
          positionTop={0}
        />
        <Text
          positionType="absolute"
          positionLeft={210}
          fontSize={20}
          animation={noAnimation}
        >
          {value.toFixed(2)}
        </Text>
      </Container>
    </Container>
  );
};
