import { Controllers, Hands, XRCanvas } from "@coconut-xr/natuerlich/defaults";
import { ImmersiveSessionOrigin } from "@coconut-xr/natuerlich/react";
import { Environment } from "@react-three/drei";
import { CoreGame } from "./CoreGame";
import useControlsStore from "./store/useControlsStore";
import { SphereBackground } from "./components/SphereBackground";
import { HandVRControls } from "./components/HandVRControls/HandVRControls";

export function VRScene() {
  const setControls = useControlsStore((state) => state.setCellphoneControls);

  return (
    <XRCanvas>
      <ImmersiveSessionOrigin>
        <CoreGame />
        <HandVRControls setControls={setControls} />

        <Environment preset="city" background />
        <SphereBackground />
        <Hands type="touch" />
        <Controllers type="pointer" />
      </ImmersiveSessionOrigin>
    </XRCanvas>
  );
}
