import { Game } from "../Game";
import { SpaceshipVRControl } from "../../components/SpaceshipVRControl";
import { VRTextDisplay } from "../../components/VRTextDisplay";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Suspense } from "react";

export function VRGame() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <VRTextDisplay />
        <Game />
        <SpaceshipVRControl />
      </Suspense>
    </>
  );
}
