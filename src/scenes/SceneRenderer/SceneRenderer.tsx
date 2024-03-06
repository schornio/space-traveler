import { Game } from "../Game";
import { useSceneStore } from "../../store/useSceneStore";
import { Suspense } from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { VRStart } from "../ScenesVR/VRStart";
import { VREnd } from "../ScenesVR/VREnd";
import { WSStart } from "../ScenesWebStandard/WSStart";
import { WSEnd } from "../ScenesWebStandard/WSEnd";
import { Canvas } from "@react-three/fiber";
import { Controllers, Hands, XRCanvas } from "@coconut-xr/natuerlich/defaults";
import { ImmersiveSessionOrigin } from "@coconut-xr/natuerlich/react";
import { SpaceshipVRControl } from "../../components/SpaceshipVRControl";
import { VRTextDisplay } from "../../components/VRTextDisplay";

export function SceneRenderer({ isVR }: { isVR: boolean }) {
  const currentScene = useSceneStore((state) => state.currentScene);

  const VRScenes = {
    start: <VRStart />,
    game: (
      <XRCanvas>
        <ImmersiveSessionOrigin>
          <Game />
          <SpaceshipVRControl />
          <VRTextDisplay />
          <Hands type="touch" />
          <Controllers type="pointer" />
        </ImmersiveSessionOrigin>
      </XRCanvas>
    ), // should I also add isVR here?
    end: <VREnd />,
  };
  const VRRendered = VRScenes[currentScene];

  const WebScenes = {
    start: <WSStart />,
    game: (
      <Canvas>
        <Game />
      </Canvas>
    ),
    end: <WSEnd />,
  };
  const WebRendered = WebScenes[currentScene];

  return (
    <Suspense
      fallback={isVR ? <LoadingSpinner /> : <p>create loading spinner...</p>}
    >
      {isVR ? VRRendered : WebRendered}
    </Suspense>
  );
}
