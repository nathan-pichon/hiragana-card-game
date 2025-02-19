import React, { useState, useEffect } from "react";
import QuizCore from "./QuizCore";

interface GameProps {
  timeLimit?: number;
  mode?: "hiragana" | "romaji" | "mixed";
}

export default function Game({ mode = "hiragana" }: GameProps) {
  const [score, setScore] = useState(0);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  return (
    <div className="container">
      <QuizCore mode={mode} onAnswer={handleAnswer} currentScore={score} />
    </div>
  );
}
