import React, { useState, useEffect } from "react";
import QuizCore from "./QuizCore";
import { useNavigate } from 'react-router-dom';

interface GameProps {
  timeLimit?: number;
  mode?: "hiragana" | "romaji" | "mixed";
}

export default function Game({ mode = "hiragana" }: GameProps) {
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  // Add mode titles mapping
  const modeTitles = {
    hiragana: "Hiragana Quiz",
    romaji: "Reverse Mode",
    mixed: "Mixed Quiz"
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  return (
    <div className="container" style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
        <button 
          className="back-button hover-scale"
          onClick={() => navigate('/')}
          aria-label="Back"
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: 'none',
            background: '#f0f0f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5"/>
            <path d="M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1>{modeTitles[mode]}</h1>
      </div>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}>
      <QuizCore mode={mode} onAnswer={handleAnswer} currentScore={score} />
      </div>
    </div>
  );
}
