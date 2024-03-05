import { Controllers, Hands, XRCanvas } from "@coconut-xr/natuerlich/defaults";
import { ImmersiveSessionOrigin } from "@coconut-xr/natuerlich/react";
import { CoreGame } from "./CoreGame";
import { SpaceshipVRControl } from "./components/SpaceshipVRControl/SpaceshipVRControl";
import { VRTextDisplay } from "./components/VRTextDisplay";

export function VRScene() {
  return (
    <XRCanvas>
      <ImmersiveSessionOrigin>
        <CoreGame />
        <SpaceshipVRControl />
        <VRTextDisplay />
        <Hands type="touch" />
        <Controllers type="pointer" />
      </ImmersiveSessionOrigin>
    </XRCanvas>
  );
}
