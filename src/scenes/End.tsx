import { Text3D } from "@react-three/drei";

type EndProps = {
  isVR: boolean;
};

export function End({ isVR }: EndProps) {
  return <>{isVR ? <EndVR /> : <EndStandard />}</>;
}

function EndVR() {
  return <Text3D font="space_age.json">End</Text3D>;
}

function EndStandard() {
  return <p>End</p>;
}
