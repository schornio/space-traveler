import { Text, Text3D } from "@react-three/drei";

type StartProps = {
  isVR: boolean;
};

export function Start({ isVR }: StartProps) {
  return <>{isVR ? <StartVR /> : <StartStandard />}</>;
}

function StartVR() {
  return <Text3D font="space_age.json">Start</Text3D>;
}

function StartStandard() {
  return <Text>Start</Text>;
}
