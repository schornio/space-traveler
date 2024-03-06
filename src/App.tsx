import { useEnterXR } from "@coconut-xr/natuerlich/react";
import { CoreGame } from "./scenes/Game";
import { TouchDeviceControls } from "./components/TouchDeviceControls";
import "./globals.css";
import { useCurrentDevice } from "./store/useCurrentDevice";
import { Canvas } from "@react-three/fiber";
import { useGameStore } from "./store/useGameStore";
import { VRScene } from "./VRScene";
import useControlsStore from "./store/useControlsStore";
import { useEffect, useState } from "react";
import { GAME_TEXT } from "./constants/gameText";
import { Start } from "./scenes/Start";
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
          <div
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
          )}

          {/* Web canvas */}
          <div className="canvas-container">
            {/* <p>Start</p> */}

            <Canvas>
              <SceneRenderer isVR={false} />
              {/* <Start isVR /> */}
              {/* <CoreGame /> */}
            </Canvas>
          </div>

          {currentDevice === "vr" && (
            <div>
              <button onClick={enterVR} className="enter-vr-btn">
                {tEnterVR}
              </button>
              <VRScene />
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
