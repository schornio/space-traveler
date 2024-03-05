import { Controllers, Hands, XRCanvas } from "@coconut-xr/natuerlich/defaults";
import {
  ImmersiveSessionOrigin,
  useInputSources,
} from "@coconut-xr/natuerlich/react";
import { Environment, Text } from "@react-three/drei";
import { CoreGame } from "./CoreGame";
import { SphereBackground } from "./components/SphereBackground";
import { SpaceshipVRControl } from "./components/SpaceshipVRControl/SpaceshipVRControl";
import { toPosition } from "./utils/toPosition";
import { fontSize } from "./utils/fontSizes";
import { useGamepadActions } from "./hooks/useGamepadActions";
import { useGameStore } from "./store/useGameStore";

export function VRScene() {
  const { healthSpaceship, score } = useGameStore((state) => ({
    healthSpaceship: state.healthSpaceship,
    score: state.score,
  }));

  return (
    <XRCanvas>
      <ImmersiveSessionOrigin>
        <CoreGame />

        <Text
          fontSize={fontSize.md}
          color="red"
          position={toPosition({
            positionIn: 2,
            positionTop: 2,
            positionLeft: 0.4,
          })}
        >
          {healthSpaceship}
        </Text>

        <Text
          fontSize={fontSize.md}
          color="red"
          position={toPosition({
            positionIn: 2,
            positionTop: 2,
            positionRight: 0.4,
          })}
        >
          {score}
        </Text>
        <SpaceshipVRControl />

        <Environment preset="city" background />
        <SphereBackground />
        <Hands type="touch" />
        <Controllers type="pointer" />
      </ImmersiveSessionOrigin>
    </XRCanvas>
  );
}
