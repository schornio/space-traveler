import { Canvas } from "@react-three/fiber";
import "./globals.css";
import { OrbitControls } from "@react-three/drei";
import { Spaceship } from "./components/Spaceship";
import { Floor } from "./components/Floor";

function App() {
  return (
    <Canvas className="">
      <ambientLight intensity={2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

      <OrbitControls />

      <Spaceship />

      <Floor />
    </Canvas>
  );
}

export default App;
