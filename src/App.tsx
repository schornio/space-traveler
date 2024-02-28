import { CoreGame } from "./CoreGame";
import { CellphoneControls } from "./components/CellphoneControls";
import "./globals.css";

import { isMobileDevice } from "./utils/isMobileDevice";

function App() {
  const isMobile = isMobileDevice();

  return (
    <>
      <div className="cellphone-container">
        <h1>{isMobile ? "phone" : "pc"}</h1>

        <CellphoneControls />
      </div>

      <div className="canvas-container">
        <CoreGame />
      </div>
    </>
  );
}

export default App;
