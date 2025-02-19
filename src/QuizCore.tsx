import React, { useState, useEffect, useCallback } from "react";
import { HiraganaChar, hiraganaData, shuffleArray } from "./HiraganaChar";
import "./HiraganaCard.css";

interface QuizCoreProps {
  mode: "hiragana" | "romaji" | "mixed";
  onAnswer: (isCorrect: boolean) => void;
  currentScore: number;
}

const getRandomChar = (currentChar: HiraganaChar | null): HiraganaChar => {
  const availableChars = hiraganaData.hiragana.filter(
    (char: HiraganaChar) =>
      !currentChar || char.character !== currentChar.character,
  );
  return availableChars[Math.floor(Math.random() * availableChars.length)];
};

const generateOptions = (
  correctChar: HiraganaChar,
  mode: QuizCoreProps["mode"],
): string[] => {
  const correctValue =
    mode === "hiragana" ? correctChar.romaji : correctChar.character;
  const otherChars = hiraganaData.hiragana
    .filter((char: HiraganaChar) => char.character !== correctChar.character)
    .map((char: HiraganaChar) =>
      mode === "hiragana" ? char.romaji : char.character,
    );

  const options = [correctValue];
  while (options.length < 3) {
    const randomValue =
      otherChars[Math.floor(Math.random() * otherChars.length)];
    if (!options.includes(randomValue)) {
      options.push(randomValue);
    }
  }
  return shuffleArray(options);
};

const QuizCore: React.FC<QuizCoreProps> = ({
  mode,
  onAnswer,
  currentScore,
}) => {
  const [currentChar, setCurrentChar] = useState<HiraganaChar>(() =>
    getRandomChar(null),
  );
  const [options, setOptions] = useState<string[]>([]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [streak, setStreak] = useState(0);
  const [currentMode, setCurrentMode] = useState<"hiragana" | "romaji">(() =>
    mode === "mixed" ? (Math.random() < 0.5 ? "hiragana" : "romaji") : mode,
  );

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
    setOptions(
      generateOptions(currentChar, mode === "mixed" ? currentMode : mode),
    );
  }, [currentChar, mode, currentMode]);

  const handleAnswer = (answer: string) => {
    if (isDisabled) return;

    setSelectedAnswer(answer);
    setIsDisabled(true);

    const isCorrect =
      (mode === "mixed" ? currentMode : mode) === "hiragana"
        ? answer === currentChar.romaji
        : answer === currentChar.character;

    if (isCorrect) {
      setStreak((s) => s + 1);
      createSparkles(document.querySelector(".card-content"));
    } else {
      setIsWrongAnswer(true);
      setStreak(0);
    }

    onAnswer(isCorrect);

    setTimeout(() => {
      if (isCorrect) {
        if (mode === "mixed") {
          setCurrentMode(Math.random() < 0.5 ? "hiragana" : "romaji");
        }
        setCurrentChar((prev) => getRandomChar(prev));
      }
      setSelectedAnswer(null);
      setIsWrongAnswer(false);
      setIsDisabled(false);
    }, 300);
  };

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
                onClick={() => handleAnswer(option)}
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

export default QuizCore;
