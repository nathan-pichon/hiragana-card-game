import { useNavigate } from "react-router-dom";
import "./GameModeSelector.css";
import { ReactComponent as OptionsIcon } from "../../assets/icons/game-options-icon.svg";

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

  const handleModeClick = (path: string) => {
    const storedSelection = localStorage.getItem("selectedHiragana");
    let selectedHiragana: any[] = [];
    try {
      selectedHiragana = storedSelection ? JSON.parse(storedSelection) : [];
    } catch (error) {
      console.error("Error parsing selectedHiragana:", error);
    }
    if (selectedHiragana.length > 2) {
      navigate(path);
    } else {
      window.alert(
        "Not enough hiragana selected to start the quiz. Please select at least 3 characters before proceeding.",
      );
    }
  };

  return (
    <div className="mode-selector-container">
      <button
        className="options-button hover-scale"
        onClick={() => navigate("/options")}
        aria-label="Options"
      >
        <OptionsIcon />
      </button>
      <h1>Hiragana Flashcards</h1>
      <div className="mode-grid">
        {modes.map((mode, index) => (
          <div
            key={index}
            className="mode-card hover-scale"
            onClick={() => handleModeClick(mode.path)}
          >
            <h2 className="mode-title">{mode.title}</h2>
            <p className="mode-description">{mode.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
