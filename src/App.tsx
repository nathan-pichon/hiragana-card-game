import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameModeSelector from "./components/game/GameModeSelector";
import GameOptions from "./components/game-options/GameOptions";
import Game from "./components/game/Game";
import { useEffect } from "react";
import { HiraganaChar, hiraganaData } from "./services/hiragana-characters";

import "./assets/shared.css";

export default function App() {
  // Initialize localStorage with base hiragana if not exists
  useEffect(() => {
    if (!localStorage.getItem("selectedHiragana")) {
      const baseCharacters = hiraganaData.hiragana.map(
        (c: HiraganaChar) => c.character,
      );
      localStorage.setItem("selectedHiragana", JSON.stringify(baseCharacters));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameModeSelector />} />
        <Route path="/hiragana-quiz" element={<Game mode="hiragana" />} />
        <Route path="/reverse-mode" element={<Game mode="romaji" />} />
        <Route path="/mixed-quiz" element={<Game mode="mixed" />} />
        <Route path="/options" element={<GameOptions />} />
      </Routes>
    </Router>
  );
}
