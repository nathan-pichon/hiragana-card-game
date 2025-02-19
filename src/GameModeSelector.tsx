import { useNavigate } from "react-router-dom";

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
    }
  ];

  // Function to handle mode navigation only if selected hiragana count is greater than 2
  const handleModeClick = (path: string) => {
    const storedSelection = localStorage.getItem('selectedHiragana');
    let selectedHiragana: any[] = [];
    try {
      selectedHiragana = storedSelection ? JSON.parse(storedSelection) : [];
    } catch (error) {
      console.error("Error parsing selectedHiragana:", error);
    }
    if (selectedHiragana.length > 2) {
      navigate(path);
    } else {
      window.alert("Not enough hiragana selected to start the quiz. Please select at least 3 characters before proceeding.");
    }
  };

  return (
    <div className="card-container">
      <button 
        className="options-button hover-scale"
        onClick={() => navigate('/options')}
        aria-label="Options"
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
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
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>
      <h1>Hiragana Flashcards</h1>
      <div className="hiragana-card">
        <div className="options-container mode-grid">
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
    </div>
  );
}
