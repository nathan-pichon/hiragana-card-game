import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameModeSelector from './GameModeSelector';
import HiraganaCard from "./HiraganaCard";
import Game from './Game';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameModeSelector />} />
        <Route path="/hiragana-quiz" element={<Game mode="hiragana" />} />
        <Route path="/reverse-mode" element={<Game mode="romaji" />} />
        <Route path="/mixed-quiz" element={<Game mode="mixed" />} />
      </Routes>
    </Router>
  );
}
