import { useCallback } from "react";
import { useSceneStore } from "../../store/useSceneStore";
import { useGameStore } from "../../store/useGameStore";
import { FaAward } from "react-icons/fa";
import { GAME_TEXT } from "../../constants/gameText";
import { IoReturnDownBackOutline } from "react-icons/io5";

export function WSEnd() {
  const nextScene = useSceneStore((state) => state.nextScene);
  const { score, resetGame } = useGameStore((state) => ({
    score: state.score,
    resetGame: state.resetGame,
  }));
  const { yourScore, thankYou, gameName, goBack } = GAME_TEXT;

  const onInteraction = useCallback(() => {
    nextScene();
    resetGame();
  }, []);

  return (
    <div className="scene-container">
      <img src="schornio_logo.png" alt="schornio logo" className="logo" />

      <div className="icon-container">
        <FaAward style={{ fontSize: "2rem", color: "#e6007e" }} />
        <p className="helper-text">
          {yourScore}: {score}
        </p>
      </div>

      <p className="helper-text">{thankYou}</p>
      <p className="game-name">{gameName}</p>

      <button onClick={onInteraction} className="icon-container">
        <IoReturnDownBackOutline style={{ fontSize: "1.5rem" }} />
        {goBack}
      </button>
    </div>
  );
}
