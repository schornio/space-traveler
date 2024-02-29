import { FC, useState } from "react";
import { useXRGamepadReader } from "@coconut-xr/natuerlich/react";
import { useFrame } from "@react-three/fiber";
import { Vector2 } from "three";
import { Container, Text, noAnimation } from "@coconut-xr/koestlich";

const SIZE = 200;

export const Axes: FC<{ inputSource: XRInputSource }> = ({ inputSource }) => {
  const reader = useXRGamepadReader(inputSource);
  const [vector] = useState(new Vector2());
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [state, setState] = useState(null);

  useFrame(() => {
    reader.readAxes("xr-standard-thumbstick", vector);
    setX((vector.x * SIZE) / 2);
    setY((vector.y * SIZE) / 2);
    const s = reader.readButtonState("xr-standard-thumbstick");
    setState(s);
  });

  return (
    <Container
      backgroundColor={0xffffff}
      backgroundOpacity={0.5}
      width={SIZE}
      height={SIZE}
      alignItems="center"
      justifyContent="center"
      borderRadius={SIZE / 2}
    >
      <Container
        width={1}
        height={SIZE}
        backgroundColor={0x666666}
        animation={noAnimation}
        borderRadius={4}
        positionType="absolute"
      />
      <Container
        width={SIZE}
        height={1}
        backgroundColor={0x666666}
        animation={noAnimation}
        borderRadius={4}
        positionType="absolute"
      />
      <Container
        width={12}
        height={12}
        animation={noAnimation}
        borderRadius={6}
        positionLeft={x}
        positionTop={y}
      />
      <Text
        positionType="absolute"
        positionLeft={210}
        fontSize={20}
        animation={noAnimation}
      >
        {x.toFixed(2)}
      </Text>
      <Text
        positionType="absolute"
        fontSize={20}
        animation={noAnimation}
        positionTop={-40}
      >
        {y.toFixed(2)}
      </Text>
    </Container>
  );
};
