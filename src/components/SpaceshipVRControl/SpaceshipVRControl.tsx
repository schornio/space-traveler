import { useCallback } from "react";
import useControlsStore, { ActionControls } from "../../store/useControlsStore";
import { useInputSources } from "@coconut-xr/natuerlich/react";
import { SpaceshipHandControl } from "./SpaceshipHandControl";

export function SpaceshipVRControl() {
  const setControls = useControlsStore((state) => state.setCellphoneControls);
  const isGamepadUsed = useInputSources().some(
    (source) => source.gamepad instanceof XRHand
  );

  const onInteraction = useCallback(
    (action: keyof ActionControls, value: boolean) => {
      setControls(action, value);
    },
    []
  );

  return (
    <group>
      {!isGamepadUsed && <SpaceshipHandControl onInteraction={onInteraction} />}
    </group>
  );
}
