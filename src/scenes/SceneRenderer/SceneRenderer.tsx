import { Game } from "../Game";
import { Start } from "../Start";
import { useSceneStore } from "../../store/useSceneStore";
import { End } from "../End";
import { Suspense } from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export function SceneRenderer({ isVR }: { isVR: boolean }) {
  const currentScene = useSceneStore((state) => state.currentScene);
  const sceneComponents = {
    start: <Start isVR={isVR} />,
    game: <Game />, // should I also add isVR here?
    end: <End isVR={isVR} />,
  };
  const SceneRendered = sceneComponents[currentScene];

  return <Suspense fallback={<LoadingSpinner />}>{SceneRendered}</Suspense>;
}
