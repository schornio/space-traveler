import { Suspense, useCallback } from "react";
import useControlsStore, { ActionControls } from "../../store/useControlsStore";
import { useInputSources } from "@coconut-xr/natuerlich/react";
import { SpaceshipHandControl } from "./SpaceshipHandControl";
import { SpaceshipGamepadControl } from "./SpaceshipGamepadControl";

export function SpaceshipVRControl() {
  const setControls = useControlsStore((state) => state.setCellphoneControls);
  const isHandUsed = useInputSources().some(
    (source) => source.hand instanceof XRHand
  );
  const inputSources = useInputSources();
  const leftInputSource = inputSources.find((s) => s.handedness === "left");

  const onInteraction = useCallback(
    (action: keyof ActionControls, value: boolean) => {
      setControls(action, value);
    },
    []
  );

  return (
    <group>
      {!isHandUsed && leftInputSource && (
        <SpaceshipGamepadControl
          onInteraction={onInteraction}
          inputSource={leftInputSource}
        />
      )}

      {isHandUsed && <SpaceshipHandControl onInteraction={onInteraction} />}
    </group>
  );
}
