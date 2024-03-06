import "./globals.css";
import { useCurrentDevice } from "./store/useCurrentDevice";
import useControlsStore from "./store/useControlsStore";
import { useEffect, useState } from "react";
import { GAME_TEXT } from "./constants/gameText";
import { SceneRenderer } from "./scenes/SceneRenderer";

const { rotateDevice } = GAME_TEXT;

function App() {
  const currentDevice = useCurrentDevice();
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
  }, [currentDevice, initializeKeyboard, isLandscape]);

  return (
    <main className="noselect">
      {isLandscape ? (
        <>
          <div
            className={`${
              currentDevice === "vr" ? undefined : "canvas-container"
            }`}
          >
            <SceneRenderer isVR={currentDevice === "vr"} />
          </div>
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
