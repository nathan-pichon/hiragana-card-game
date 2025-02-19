import React, { useState } from "react";
import QuizCore from "./QuizCore";

const HiraganaCard: React.FC = () => {
  const [score, setScore] = useState(0);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  return (
    <QuizCore mode="hiragana" onAnswer={handleAnswer} currentScore={score} />
  );
};

export default HiraganaCard;
