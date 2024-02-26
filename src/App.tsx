import { Canvas } from "@react-three/fiber";
import "./globals.css";
import { OrbitControls } from "@react-three/drei";
import { Spaceship } from "./components/3DModels/Spaceship";
import { Floor } from "./components/Floor";
import { Asteroid } from "./components/3DModels/Asteroid";
import { toPosition } from "./utils/toPosition";

function App() {
  return (
    <Canvas>
      <ambientLight intensity={9} />

      {/* <OrbitControls /> */}

      <Spaceship />
      {/* <Asteroid /> */}
      <Floor />
    </Canvas>
  );
}

export default App;
