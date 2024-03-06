import { useCallback } from "react";
import { useSceneStore } from "../../store/useSceneStore";

export function WSEnd() {
  const nextScene = useSceneStore((state) => state.nextScene);

  const onInteraction = useCallback(() => {
    nextScene();
  }, []);

  return (
    <div className="scene-container">
      <img src="schornio_logo.png" alt="schornio logo" className="logo" />
      <p>End</p>

      <button onClick={onInteraction}>Return</button>
    </div>
  );
}
