import { useCallback } from "react";
import useControlsStore, { ActionControls } from "../../store/useControlsStore";
import {
  FaArrowCircleDown,
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaArrowCircleUp,
} from "react-icons/fa";
import { GiLaserGun } from "react-icons/gi";

export function TouchDeviceControls() {
  const setControls = useControlsStore((state) => state.setControls);

  const onCellphoneInteraction = useCallback(
    (action: keyof ActionControls, value: boolean) => {
      setControls(action, value);
    },
    []
  );

  return (
    <div className="container-btn">
      <button
        className="tablet-cellphone-btn"
        onTouchStart={() => {
          onCellphoneInteraction("up", true);
        }}
        onTouchEnd={() => {
          onCellphoneInteraction("up", false);
        }}
      >
        <FaArrowCircleUp />
      </button>

      <button
        className="tablet-cellphone-btn"
        onTouchStart={() => {
          onCellphoneInteraction("left", true);
        }}
        onTouchEnd={() => {
          onCellphoneInteraction("left", false);
        }}
      >
        <FaArrowCircleLeft className="icon-btn" />
      </button>

      <button
        className="tablet-cellphone-btn"
        onTouchStart={() => {
          onCellphoneInteraction("right", true);
        }}
        onTouchEnd={() => {
          onCellphoneInteraction("right", false);
        }}
      >
        <FaArrowCircleRight />
      </button>

      <button
        className="tablet-cellphone-btn"
        onTouchStart={() => {
          onCellphoneInteraction("down", true);
        }}
        onTouchEnd={() => {
          onCellphoneInteraction("down", false);
        }}
      >
        <FaArrowCircleDown />
      </button>

      <button
        onTouchStart={() => {
          onCellphoneInteraction("shoot", true);
        }}
        onTouchEnd={() => {
          onCellphoneInteraction("shoot", false);
        }}
      >
        <GiLaserGun />
      </button>
    </div>
  );
}
