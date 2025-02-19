import { useNavigate } from 'react-router-dom';

export default function GameModeSelector() {
  const navigate = useNavigate();

  const modes = [
    {
      title: "Hiragana Quiz",
      description: "あ → A",
      path: "/hiragana-quiz",
    },
    {
      title: "Reverse Mode",
      description: "A → あ",
      path: "/reverse-mode",
    },
    {
      title: "Mixed Quiz",
      description: "あ → A\nA → あ",
      path: "/mixed-quiz",
    },
  ];

  return (
    <div className="card-container">
      <h1>Hiragana Flashcards</h1>
      <div className="hiragana-card">
          <div className="options-container mode-grid">
            {modes.map((mode, index) => (
              <div
                key={index}
                className="mode-card hover-scale"
                onClick={() => navigate(mode.path)}
              >
                <h2 className="mode-title">{mode.title}</h2>
                <p className="mode-description">{mode.description}</p>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
} 