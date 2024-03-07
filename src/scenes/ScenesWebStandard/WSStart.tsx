import { useCallback } from "react";
import { useSceneStore } from "../../store/useSceneStore";
import { GAME_TEXT } from "../../constants/gameText";
import { FaPlay } from "react-icons/fa";

export function WSStart() {
  const nextScene = useSceneStore((state) => state.nextScene);
  const { welcomeTo, gameName } = GAME_TEXT;

  const onInteraction = useCallback(() => {
    nextScene();
  }, []);

  return (
    <div className="scene-container">
      <img src="schornio_logo.png" alt="schornio logo" className="logo" />
      <p className="helper-text">{welcomeTo}</p>
      <p className="game-name">{gameName}</p>

      <button onClick={onInteraction} className="icon-container">
        <FaPlay style={{ fontSize: "1rem" }} />
        Start Game
      </button>
    </div>
  );
}
