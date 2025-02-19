import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameModeSelector from "./GameModeSelector";
import Options from './Options';
import Game from "./Game";
import { useEffect } from 'react';
import { HiraganaChar, hiraganaData } from './HiraganaChar';

export default function App() {
  // Initialize localStorage with base hiragana if not exists
  useEffect(() => {
    if (!localStorage.getItem('selectedHiragana')) {
      const baseCharacters = hiraganaData.hiragana.map((c: HiraganaChar) => c.character);
      localStorage.setItem('selectedHiragana', JSON.stringify(baseCharacters));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameModeSelector />} />
        <Route path="/hiragana-quiz" element={<Game mode="hiragana" />} />
        <Route path="/reverse-mode" element={<Game mode="romaji" />} />
        <Route path="/mixed-quiz" element={<Game mode="mixed" />} />
        <Route path="/options" element={<Options />} />
      </Routes>
    </Router>
  );
}
