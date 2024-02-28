import { CoreGame } from "./CoreGame";
import { CellphoneControls } from "./components/CellphoneControls";
import "./globals.css";
import { useCurrentDevice } from "./store/useCurrentDevice";

function App() {
  const currentDevice = useCurrentDevice();

  return (
    <>
      <div className="cellphone-container">
        <h1
          style={{
            position: "absolute",
            top: "10px",
            left: "50%",
            color: "white",
            transform: "translateX(-50%)",
          }}
        >
          {currentDevice.toUpperCase()}
        </h1>

        <CellphoneControls />
      </div>

      <div className="canvas-container">
        <CoreGame />
      </div>
    </>
  );
}

export default App;
