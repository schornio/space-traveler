import { Game } from "../Game";
import { SpaceshipVRControl } from "../../components/SpaceshipVRControl";
import { VRTextDisplay } from "../../components/VRTextDisplay";

export function VRGame() {
  return (
    <>
      <VRTextDisplay />
      <Game />
      <SpaceshipVRControl />
    </>
  );
}
