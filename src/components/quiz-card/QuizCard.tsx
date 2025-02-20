import React, { useEffect, useCallback } from "react";
import { HiraganaChar } from "../../services/hiragana-characters";
import "./QuizCard.css";

interface QuizCardProps {
  currentChar: HiraganaChar;
  options: string[];
  streak: number;
  isFlipping: boolean;
  isSparkling: boolean;
  isWrongAnswer: boolean;
  selectedAnswer: string | null;
  isDisabled: boolean;
  currentMode: "hiragana" | "romaji";
  mode: "hiragana" | "romaji" | "mixed";
  onAnswer: (answer: string) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  currentChar,
  options,
  streak,
  isFlipping,
  isSparkling,
  isWrongAnswer,
  selectedAnswer,
  isDisabled,
  currentMode,
  mode,
  onAnswer,
}) => {
  const createSparkles = useCallback((cardElement: HTMLElement | null) => {
    if (!cardElement) return;

    const sparklesContainer = document.createElement("div");
    sparklesContainer.className = "sparkles";

    for (let i = 0; i < 20; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.animationDelay = `${Math.random() * 0.5}s`;
      sparklesContainer.appendChild(sparkle);
    }

    cardElement.appendChild(sparklesContainer);
    setTimeout(() => sparklesContainer.remove(), 300);
  }, []);

  useEffect(() => {
    if (isSparkling) {
      createSparkles(document.querySelector(".card-content"));
    }
  }, [isSparkling, createSparkles]);

  return (
    <div className="card-container">
      <div
        className={`hiragana-card ${isFlipping ? "flipping" : ""} ${
          isWrongAnswer ? "wrong-answer" : ""
        }`}
      >
        <div className="card-content">
          <div className="streak-counter">Streak: {streak}</div>
          <div className="hiragana" translate="no">
            {(mode === "mixed" ? currentMode : mode) === "hiragana"
              ? currentChar.character
              : currentChar.romaji}
          </div>
          <div className="options-container">
            {options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedAnswer === option
                    ? (
                        (mode === "mixed" ? currentMode : mode) === "hiragana"
                          ? option === currentChar.romaji
                          : option === currentChar.character
                      )
                      ? "correct"
                      : "incorrect"
                    : ""
                }`}
                onClick={() => onAnswer(option)}
                disabled={isDisabled}
                translate="no"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
