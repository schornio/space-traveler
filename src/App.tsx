import { useEnterXR } from "@coconut-xr/natuerlich/react";
import { Game } from "./scenes/Game";
import { TouchDeviceControls } from "./components/TouchDeviceControls";
import "./globals.css";
import { useCurrentDevice } from "./store/useCurrentDevice";
import { Canvas } from "@react-three/fiber";
import { useGameStore } from "./store/useGameStore";
import { VRScene } from "./VRScene";
import useControlsStore from "./store/useControlsStore";
import { useEffect, useState } from "react";
import { GAME_TEXT } from "./constants/gameText";
import { SceneRenderer } from "./scenes/SceneRenderer";

const sessionOptions: XRSessionInit = {
  requiredFeatures: ["local-floor", "hand-tracking"],
};
const { health, score: tScore, enterVR: tEnterVR, rotateDevice } = GAME_TEXT;

function App() {
  const currentDevice = useCurrentDevice();
  const enterVR = useEnterXR("immersive-ar", sessionOptions);
  const { healthSpaceship, score } = useGameStore((state) => ({
    healthSpaceship: state.healthSpaceship,
    score: state.score,
  }));
  const initializeKeyboard = useControlsStore(
    (state) => state.initializeKeyboard
  );
  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight
  );

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (currentDevice === "web") {
      const cleanUp = initializeKeyboard();

      return () => {
        cleanUp();
      };
    }
  }, [initializeKeyboard]);

  return (
    <main className="noselect">
      {isLandscape ? (
        <>
          {/* TO-DO: Find a way to make the menus work better with the scene renderer - centralizing it (https://github.com/orgs/schornio/projects/6/views/1?pane=issue&itemId=55536859) */}
          {/* <div
            style={{
              fontSize: currentDevice === "touchDevice" ? "1rem" : "2rem",
            }}
          >
            <p className="health-info">
              {health}:{" "}
              <span className="info-detail">
                {String(healthSpaceship).toUpperCase()}
              </span>
            </p>
            <p className="device-info">{currentDevice.toUpperCase()}</p>
            <p className="score-info">
              {tScore}: <span className="info-detail">{score}</span>
            </p>
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
          )} */}

          {/* Web canvas */}
          <div className="canvas-container">
            <SceneRenderer isVR={false} />
          </div>

          {currentDevice === "vr" && (
            <div>
              <button onClick={enterVR} className="enter-vr-btn">
                {tEnterVR}
              </button>
              <SceneRenderer isVR={true} />
            </div>
          )}
        </>
      ) : (
        <RotateDevice />
      )}
    </main>
  );
}

function RotateDevice() {
  return (
    <div className="rotate-device-container">
      <p>{rotateDevice}</p>
    </div>
  );
}

export default App;
