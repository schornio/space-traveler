import { useInputSources } from "@coconut-xr/natuerlich/react";
import { ThreeEvent } from "@react-three/fiber";
import { useCallback, useMemo, useRef } from "react";

const HAND_EVENT_DELAY = 50;

type InteractionProps = {
  onHandPress?: (e?: ThreeEvent<PointerEvent>) => void;
  onHandRelease?: (e?: ThreeEvent<PointerEvent>) => void;
  onControllerPress?: (e?: ThreeEvent<PointerEvent>) => void;
  onControllerRelease?: (e?: ThreeEvent<PointerEvent>) => void;
};

export function useInteractionHandlers({
  onHandPress,
  onHandRelease,
  onControllerPress,
  onControllerRelease,
}: InteractionProps) {
  const isHandUsed = useInputSources().some(
    (source) => source.hand instanceof XRHand
  );
  const handPressTimer = useRef<number | null>(null);
  const handReleaseTimer = useRef<number | null>(null);

  const setHandPressTimer = useCallback(() => {
    if (handPressTimer.current) {
      clearTimeout(handPressTimer.current);
    }

    handPressTimer.current = window.setTimeout(() => {
      onHandPress?.();
    }, HAND_EVENT_DELAY);
  }, [handPressTimer, onHandPress]);

  const setHandReleaseTimer = useCallback(() => {
    if (handReleaseTimer.current) {
      clearTimeout(handReleaseTimer.current);
    }

    handReleaseTimer.current = window.setTimeout(() => {
      onHandRelease?.();
    }, HAND_EVENT_DELAY);
  }, [handReleaseTimer, onHandRelease]);

  const interactionHandlers = useMemo(() => {
    return isHandUsed
      ? {
          onPointerEnter: setHandPressTimer,
          onPointerLeave: setHandReleaseTimer,
        }
      : {
          onPointerDown: (e?: ThreeEvent<PointerEvent>) =>
            onControllerPress?.(e),
          onPointerUp: (e?: ThreeEvent<PointerEvent>) =>
            onControllerRelease?.(e),
        };
  }, [
    isHandUsed,
    onControllerPress,
    onControllerRelease,
    setHandPressTimer,
    setHandReleaseTimer,
  ]);

  return interactionHandlers;
}
