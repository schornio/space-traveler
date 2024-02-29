import { useCallback } from "react";
import useControlsStore, { ActionControls } from "../../store/useControlsStore";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
} from "react-icons/fa";
import { GiLaserGun } from "react-icons/gi";

export function TouchDeviceControls() {
  const setControls = useControlsStore((state) => state.setControls);

  const onTouchDeviceInteraction = useCallback(
    (action: keyof ActionControls, value: boolean) => {
      setControls(action, value);
    },
    []
  );

  return (
    <div className="touch-device-controls-container noselect">
      <div className="touch-device-directions">
        <button
          className="touch-device-controls-btn up-btn "
          onTouchStart={(e) => {
            e.preventDefault();
            onTouchDeviceInteraction("up", true);
          }}
          onTouchEnd={() => {
            onTouchDeviceInteraction("up", false);
          }}
        >
          <FaArrowUp className="icon-btn" />
        </button>

        <button
          className="touch-device-controls-btn left-btn"
          onTouchStart={() => {
            onTouchDeviceInteraction("left", true);
          }}
          onTouchEnd={() => {
            onTouchDeviceInteraction("left", false);
          }}
        >
          <FaArrowLeft className="icon-btn" />
        </button>

        <button
          className="touch-device-controls-btn right-btn"
          onTouchStart={() => {
            onTouchDeviceInteraction("right", true);
          }}
          onTouchEnd={() => {
            onTouchDeviceInteraction("right", false);
          }}
        >
          <FaArrowRight className="icon-btn" />
        </button>

        <button
          className="touch-device-controls-btn down-btn"
          onTouchStart={() => {
            onTouchDeviceInteraction("down", true);
          }}
          onTouchEnd={() => {
            onTouchDeviceInteraction("down", false);
          }}
        >
          <FaArrowDown className="icon-btn" />
        </button>
      </div>

      <button
        className="shoot-btn"
        onTouchStart={() => {
          onTouchDeviceInteraction("shoot", true);
        }}
        onTouchEnd={() => {
          onTouchDeviceInteraction("shoot", false);
        }}
      >
        <GiLaserGun className="icon-btn" />
      </button>
    </div>
  );
}
