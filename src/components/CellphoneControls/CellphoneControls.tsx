import { TouchEvent, useCallback } from "react";
import { ActionKey, useControls } from "../../hooks/useControls";

export function CellphoneControls() {
  const { updateControls } = useControls();

  const onTouchStart = useCallback((e: any, action: ActionKey) => {
    e.preventDefault();
    //   console.log("e", e);
    // console.log("on touch started called");

    updateControls(action, true);
  }, []);

  function handleTouchEnd(action: ActionKey) {
    // console.log("handleEnd: action", action);
    updateControls(action, false);
  }

  return (
    <div className="">
      <button
        onMouseDown={(e) => {
          console.log("onMouseDown");

          onTouchStart(e, "up");
        }}
        onMouseUp={() => {
          console.log("onMouseUp");

          handleTouchEnd("up");
        }}
        onTouchStart={(e) => onTouchStart(e, "up")}
        onTouchEnd={() => handleTouchEnd("up")}
      >
        👆
      </button>

      <button
        onMouseDown={(e) => onTouchStart(e, "up")}
        onMouseUp={() => handleTouchEnd("up")}
        onTouchStart={(e) => onTouchStart(e, "up")}
        onTouchEnd={() => handleTouchEnd("down")}
      >
        👈
      </button>
      <button
        onTouchStart={(e) => onTouchStart(e, "up")}
        onTouchEnd={() => handleTouchEnd("down")}
      >
        👇
      </button>
      <button
        onTouchStart={(e) => onTouchStart(e, "up")}
        onTouchEnd={() => handleTouchEnd("right")}
      >
        👉
      </button>
      <button onTouchStart={(e) => onTouchStart(e, "shoot")}>Shoot</button>
    </div>
  );
}
