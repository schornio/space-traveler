import { useCallback } from "react";
import useControlsStore, { ActionControls } from "../../store/useControlsStore";
import { useInputSources } from "@coconut-xr/natuerlich/react";
import { SpaceshipHandControl } from "./SpaceshipHandControl";
import { SpaceshipGamepadControl } from "./SpaceshipGamepadControl";

export function SpaceshipVRControl() {
  const setControls = useControlsStore((state) => state.setControls);
  const isHandUsed = useInputSources().some(
    (source) => source.hand instanceof XRHand
  );
  const inputSources = useInputSources();
  const leftInputSource = inputSources.find((s) => s.handedness === "left");
  const rightInputSource = inputSources.find((s) => s.handedness === "right");

  const onInteraction = useCallback(
    (action: keyof ActionControls, value: boolean) => {
      setControls(action, value);
    },
    []
  );

  return (
    <group>
      {!isHandUsed && leftInputSource && (
        <SpaceshipGamepadControl inputSource={leftInputSource} />
      )}

      {!isHandUsed && rightInputSource && (
        <SpaceshipGamepadControl inputSource={rightInputSource} />
      )}

      {isHandUsed && <SpaceshipHandControl onInteraction={onInteraction} />}
    </group>
  );
}
