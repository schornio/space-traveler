import { Canvas } from "@react-three/fiber";
import { useCurrentDevice } from "../../store/useCurrentDevice";
import { Game } from "../Game";
import { TouchDeviceControls } from "../../components/TouchDeviceControls";
import { GAME_TEXT } from "../../constants/gameText";
import { useGameStore } from "../../store/useGameStore";
import { Environment } from "@react-three/drei";
import { useCountdownStore } from "../../store/useCountdownStore";
import { SphereBackground } from "../../components/SphereBackground";

const { health, score: tScore, countdown } = GAME_TEXT;

export function WSGame() {
  const currentDevice = useCurrentDevice();
  const secondsLeft = useCountdownStore((state) => state.secondsLeft);
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
          {countdown}: <span className="info-detail">{secondsLeft}</span>
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
          <SphereBackground />
          <ambientLight intensity={9} />
          <Environment preset="city" />
          <Game />
        </Canvas>
      </div>
    </>
  );
}
