import {
  ImmersiveSessionOrigin,
  useEnterXR,
} from "@coconut-xr/natuerlich/react";
import { CoreGame } from "./CoreGame";
import { CellphoneControls } from "./components/CellphoneControls";
import "./globals.css";
import { useCurrentDevice } from "./store/useCurrentDevice";
import { Controllers, Hands, XRCanvas } from "@coconut-xr/natuerlich/defaults";
import { Canvas } from "@react-three/fiber";
import { useGameStore } from "./store/useGameStore";

const sessionOptions: XRSessionInit = {
  requiredFeatures: ["local-floor", "hand-tracking"],
};

function App() {
  const currentDevice = useCurrentDevice();
  const enterVR = useEnterXR("immersive-ar", sessionOptions);
  const { healthSpaceship, score } = useGameStore((state) => ({
    healthSpaceship: state.healthSpaceship,
    score: state.score,
  }));

  return (
    <main>
      <div
        style={{
          position: "absolute",
          top: "10%",
          height: "10%",
          width: "100%",
          color: "white",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          fontSize: currentDevice === "cellphone" ? "1rem" : "2rem",
        }}
      >
        <p>{`Health: ${String(healthSpaceship).toUpperCase()}`}</p>
        <p>{currentDevice.toUpperCase()}</p>
        <p>{`Score: ${String(score).toUpperCase()}`}</p>
      </div>

      {currentDevice === "cellphone" && (
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            height: "10%",
            width: "100%",
            color: "white",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            fontSize: currentDevice === "cellphone" ? "1rem" : "2rem",
          }}
        >
          <CellphoneControls />
        </div>
      )}

      {/* Web canvas */}
      <div className="canvas-container">
        <Canvas>
          <CoreGame />
        </Canvas>
      </div>

      {currentDevice === "vr" && (
        <button onClick={enterVR} className="enter-vr-btn">
          Enter VR
        </button>
      )}

      <div>
        <XRCanvas>
          <ImmersiveSessionOrigin>
            <Hands type="grab" />
            <Controllers type="pointer" />

            <CoreGame />
          </ImmersiveSessionOrigin>
        </XRCanvas>
      </div>
    </main>
  );
}

export default App;
