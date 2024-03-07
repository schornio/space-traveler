import { useSceneStore } from "../../store/useSceneStore";
import { Suspense } from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { VRStart } from "../ScenesVR/VRStart";
import { VREnd } from "../ScenesVR/VREnd";
import { WSStart } from "../ScenesWebStandard/WSStart";
import { WSEnd } from "../ScenesWebStandard/WSEnd";
import { VRGame } from "../ScenesVR/VRGame";
import { WSGame } from "../ScenesWebStandard/WSGame";
import {
  ImmersiveSessionOrigin,
  useEnterXR,
} from "@coconut-xr/natuerlich/react";
import { Controllers, Hands, XRCanvas } from "@coconut-xr/natuerlich/defaults";
import { GAME_TEXT } from "../../constants/gameText";
import { Environment } from "@react-three/drei";
import { SphereBackground } from "../../components/SphereBackground";

const sessionOptions: XRSessionInit = {
  requiredFeatures: ["local-floor", "hand-tracking"],
};

type SceneRendererProps = {
  isVR: boolean;
};

const { enterVR: tEnterVR } = GAME_TEXT;

export function SceneRenderer({ isVR }: SceneRendererProps) {
  const currentScene = useSceneStore((state) => state.currentScene);
  const enterVR = useEnterXR("immersive-vr", sessionOptions);

  const VRScenes = {
    start: <VRStart />,
    game: <VRGame />,
    end: <VREnd />,
  };

  const VRRendered = (
    <>
      <div className="scene-container">
        <img src="schornio_logo.png" alt="schornio logo" className="logo" />
        <p>Start</p>
        <button onClick={enterVR} className="enter-vr-btn">
          {tEnterVR}
        </button>
      </div>

      <XRCanvas>
        <ImmersiveSessionOrigin>
          <SphereBackground />
          <ambientLight intensity={9} />
          <Environment preset="city" />
          <Suspense fallback={<LoadingSpinner />}>
            {VRScenes[currentScene]}
          </Suspense>
          <Hands type="touch" />
          <Controllers type="pointer" />
        </ImmersiveSessionOrigin>
      </XRCanvas>
    </>
  );

  const WebScenes = {
    start: <WSStart />,
    game: <WSGame />,
    end: <WSEnd />,
  };

  const WebRendered = (
    <Suspense fallback={<p>create loading spinner...</p>}>
      {WebScenes[currentScene]}
    </Suspense>
  );

  return <>{isVR ? VRRendered : WebRendered}</>;
}
