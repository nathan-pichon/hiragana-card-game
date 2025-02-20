import React from "react";
import QuizEngine from "../quiz-engine/QuizEngine";
import { useNavigate } from "react-router-dom";
import "./Game.css";

import { ReactComponent as BackIcon } from "../../assets/icons/back-icon.svg";

interface GameProps {
  timeLimit?: number;
  mode?: "hiragana" | "romaji" | "mixed";
}

export default function Game({ mode = "hiragana" }: GameProps) {
  const navigate = useNavigate();

  // Add mode titles mapping
  const modeTitles = {
    hiragana: "Hiragana Quiz",
    romaji: "Reverse Mode",
    mixed: "Mixed Quiz",
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <button
          className="game-back-button hover-scale"
          onClick={() => navigate("/")}
          aria-label="Back"
        >
          <BackIcon />
        </button>
        <h1>{modeTitles[mode]}</h1>
      </div>
      <div className="game-quiz-container">
        <QuizEngine mode={mode} />
      </div>
    </div>
  );
}
