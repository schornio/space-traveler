import { useCallback } from "react";
import { useSceneStore } from "../../store/useSceneStore";

export function WSStart() {
  const nextScene = useSceneStore((state) => state.nextScene);

  const onInteraction = useCallback(() => {
    nextScene();
  }, []);

  return (
    <div className="scene-container">
      <img src="schornio_logo.png" alt="schornio logo" className="logo" />
      <p>Start</p>

      <button onClick={onInteraction}>Start Game</button>
    </div>
  );
}
