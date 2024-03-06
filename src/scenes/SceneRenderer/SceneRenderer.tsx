import { useSceneStore } from "../../store/useSceneStore";
import { Suspense } from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { VRStart } from "../ScenesVR/VRStart";
import { VREnd } from "../ScenesVR/VREnd";
import { WSStart } from "../ScenesWebStandard/WSStart";
import { WSEnd } from "../ScenesWebStandard/WSEnd";
import { VRGame } from "../ScenesVR/VRGame";
import { WSGame } from "../ScenesWebStandard/WSGame";

type SceneRendererProps = {
  isVR: boolean;
};

export function SceneRenderer({ isVR }: SceneRendererProps) {
  const currentScene = useSceneStore((state) => state.currentScene);

  const VRScenes = {
    start: <VRStart />,
    game: <VRGame />,
    end: <VREnd />,
  };
  const VRRendered = VRScenes[currentScene];

  const WebScenes = {
    start: <WSStart />,
    game: <WSGame />,
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
