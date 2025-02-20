import React, { useState, useEffect } from "react";
import { HiraganaChar, hiraganaData } from "../../services/hiragana-characters";
import { shuffleArray } from "../../utils/shuffle-array";
import QuizCard from "../quiz-card/QuizCard";
import "./QuizEngine.css";

interface QuizEngineProps {
  mode: "hiragana" | "romaji" | "mixed";
  onScoreChange?: (score: number) => void;
}

const getSelectedHiragana = () =>
  hiraganaData.hiragana.filter((char: HiraganaChar) =>
    JSON.parse(localStorage.getItem("selectedHiragana") || "[]").includes(
      char.character,
    ),
  );

const getRandomChar = (currentChar: HiraganaChar | null): HiraganaChar => {
  const availableChars = getSelectedHiragana().filter(
    (char: HiraganaChar) =>
      !currentChar || char.character !== currentChar.character,
  );
  return availableChars[Math.floor(Math.random() * availableChars.length)];
};

const generateOptions = (
  correctChar: HiraganaChar,
  mode: QuizEngineProps["mode"],
): string[] => {
  const correctValue =
    mode === "hiragana" ? correctChar.romaji : correctChar.character;
  const otherChars = getSelectedHiragana()
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

const QuizEngine: React.FC<QuizEngineProps> = ({
  mode,
  onScoreChange = () => {},
}) => {
  const [currentChar, setCurrentChar] = useState<HiraganaChar>(() =>
    getRandomChar(null),
  );
  const [options, setOptions] = useState<string[]>([]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isSparkling, setIsSparkling] = useState(false);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [currentMode, setCurrentMode] = useState<"hiragana" | "romaji">(
    mode === "mixed" ? (Math.random() < 0.5 ? "hiragana" : "romaji") : mode,
  );

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
      setScore((prev) => prev + 1);
      onScoreChange(score + 1);
      setIsSparkling(true);
    } else {
      setIsWrongAnswer(true);
      setStreak(0);
    }

    setTimeout(() => {
      if (isCorrect) {
        if (mode === "mixed") {
          setCurrentMode(Math.random() < 0.5 ? "hiragana" : "romaji");
        }
        setCurrentChar((prev) => getRandomChar(prev));
        setIsFlipping(true);
      }
      setSelectedAnswer(null);
      setIsWrongAnswer(false);
      setIsDisabled(false);
      setIsSparkling(false);
      setIsFlipping(false);
    }, 300);
  };

  return (
    <QuizCard
      currentChar={currentChar}
      options={options}
      streak={streak}
      isFlipping={isFlipping}
      isSparkling={isSparkling}
      isWrongAnswer={isWrongAnswer}
      selectedAnswer={selectedAnswer}
      isDisabled={isDisabled}
      currentMode={currentMode}
      mode={mode}
      onAnswer={handleAnswer}
    />
  );
};

export default QuizEngine;
