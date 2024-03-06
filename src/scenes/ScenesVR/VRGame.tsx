import { Controllers, Hands, XRCanvas } from "@coconut-xr/natuerlich/defaults";
import {
  ImmersiveSessionOrigin,
  useEnterXR,
} from "@coconut-xr/natuerlich/react";
import { Game } from "../Game";
import { SpaceshipVRControl } from "../../components/SpaceshipVRControl";
import { VRTextDisplay } from "../../components/VRTextDisplay";
import { GAME_TEXT } from "../../constants/gameText";

const sessionOptions: XRSessionInit = {
  requiredFeatures: ["local-floor", "hand-tracking"],
};

const { health, score: tScore, enterVR: tEnterVR } = GAME_TEXT;

export function VRGame() {
  const enterVR = useEnterXR("immersive-ar", sessionOptions);

  return (
    <>
      <button onClick={enterVR} className="enter-vr-btn">
        {tEnterVR}
      </button>
      <XRCanvas>
        <ImmersiveSessionOrigin>
          <Game />
          <SpaceshipVRControl />
          <VRTextDisplay />
          <Hands type="touch" />
          <Controllers type="pointer" />
        </ImmersiveSessionOrigin>
      </XRCanvas>
    </>
  );
}
