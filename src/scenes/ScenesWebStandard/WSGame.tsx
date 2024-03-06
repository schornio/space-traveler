import { Canvas } from "@react-three/fiber";
import { useCurrentDevice } from "../../store/useCurrentDevice";
import { Game } from "../Game";
import { TouchDeviceControls } from "../../components/TouchDeviceControls";
import { GAME_TEXT } from "../../constants/gameText";
import { useGameStore } from "../../store/useGameStore";
import { useCountdown } from "../../components/Countdown/useCountdown";

const { health, score: tScore, countdown } = GAME_TEXT;

export function WSGame() {
  const currentDevice = useCurrentDevice();
  const { healthSpaceship, score } = useGameStore((state) => ({
    healthSpaceship: state.healthSpaceship,
    score: state.score,
  }));

  return (
    <>
      <div
        style={{
          fontSize: currentDevice === "touchDevice" ? "1rem" : "2rem",
        }}
      >
        <p className="ws-info health-info">
          {health}:{" "}
          <span className="info-detail">
            {String(healthSpaceship).toUpperCase()}
          </span>
        </p>

        <p className="ws-info score-info">
          {tScore}: <span className="info-detail">{score}</span>
        </p>

        <p className="ws-info countdown-info">
          {countdown}: <span className="info-detail">{0}</span>
        </p>

        <p className="device-info">{currentDevice.toUpperCase()}</p>
      </div>

      {currentDevice === "touchDevice" && (
        <div
          className="touch-device-controls-container"
          style={{
            fontSize: currentDevice === "touchDevice" ? "1rem" : "2rem",
          }}
        >
          <TouchDeviceControls />
        </div>
      )}

      {/* Web canvas */}
      <div className="canvas-container">
        <img
          src="schornio_logo.png"
          alt=""
          className={`${
            currentDevice === "web" ? "logo-web-canvas" : "logo-touch-device"
          }`}
        />

        <Canvas>
          <Game />
        </Canvas>
      </div>
    </>
  );
}
