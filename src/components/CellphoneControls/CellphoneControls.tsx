import { useCallback } from "react";
import useControlsStore, { ActionControls } from "../../store/useControlsStore";

export function CellphoneControls() {
  const setControls = useControlsStore((state) => state.setCellphoneControls);

  const onCellphoneInteraction = useCallback(
    (action: keyof ActionControls, value: boolean) => {
      setControls(action, value);
    },
    []
  );

  return (
    <div className="">
      <button
        onTouchStart={() => {
          onCellphoneInteraction("up", true);
        }}
        onTouchEnd={() => {
          onCellphoneInteraction("up", false);
        }}
      >
        👆
      </button>

      <button
        onTouchStart={() => {
          onCellphoneInteraction("left", true);
        }}
        onTouchEnd={() => {
          onCellphoneInteraction("left", false);
        }}
      >
        👈
      </button>

      <button
        onTouchStart={() => {
          onCellphoneInteraction("right", true);
        }}
        onTouchEnd={() => {
          onCellphoneInteraction("right", false);
        }}
      >
        👉
      </button>

      <button
        onTouchStart={() => {
          onCellphoneInteraction("down", true);
        }}
        onTouchEnd={() => {
          onCellphoneInteraction("down", false);
        }}
      >
        👇
      </button>

      <button
        onTouchStart={() => {
          onCellphoneInteraction("shoot", true);
        }}
        onTouchEnd={() => {
          onCellphoneInteraction("shoot", false);
        }}
      >
        🔫
      </button>
    </div>
  );
}
