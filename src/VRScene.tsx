import { Controllers, Hands, XRCanvas } from "@coconut-xr/natuerlich/defaults";
import { ImmersiveSessionOrigin } from "@coconut-xr/natuerlich/react";
import { Game } from "./scenes/Game";
import { SpaceshipVRControl } from "./components/SpaceshipVRControl/SpaceshipVRControl";
import { VRTextDisplay } from "./components/VRTextDisplay";

export function VRScene() {
  return (
    <XRCanvas>
      <ImmersiveSessionOrigin>
        <Game />
        <SpaceshipVRControl />
        <VRTextDisplay />
        <Hands type="touch" />
        <Controllers type="pointer" />
      </ImmersiveSessionOrigin>
    </XRCanvas>
  );
}
