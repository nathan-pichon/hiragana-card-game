import React, { useState, useEffect, useCallback } from "react";
import "./HiraganaCard.css";

interface HiraganaChar {
  character: string;
  romaji: string;
}

const hiraganaData = {
  hiragana: [
    // Basic Hiragana (あ行 to わ行)
    { character: "あ", romaji: "a" },
    { character: "い", romaji: "i" },
    { character: "う", romaji: "u" },
    { character: "え", romaji: "e" },
    { character: "お", romaji: "o" },
    { character: "か", romaji: "ka" },
    { character: "き", romaji: "ki" },
    { character: "く", romaji: "ku" },
    { character: "け", romaji: "ke" },
    { character: "こ", romaji: "ko" },
    { character: "さ", romaji: "sa" },
    { character: "し", romaji: "shi" },
    { character: "す", romaji: "su" },
    { character: "せ", romaji: "se" },
    { character: "そ", romaji: "so" },
    { character: "た", romaji: "ta" },
    { character: "ち", romaji: "chi" },
    { character: "つ", romaji: "tsu" },
    { character: "て", romaji: "te" },
    { character: "と", romaji: "to" },
    { character: "な", romaji: "na" },
    { character: "に", romaji: "ni" },
    { character: "ぬ", romaji: "nu" },
    { character: "ね", romaji: "ne" },
    { character: "の", romaji: "no" },
    { character: "は", romaji: "ha" },
    { character: "ひ", romaji: "hi" },
    { character: "ふ", romaji: "fu" },
    { character: "へ", romaji: "he" },
    { character: "ほ", romaji: "ho" },
    { character: "ま", romaji: "ma" },
    { character: "み", romaji: "mi" },
    { character: "む", romaji: "mu" },
    { character: "め", romaji: "me" },
    { character: "も", romaji: "mo" },
    { character: "や", romaji: "ya" },
    { character: "ゆ", romaji: "yu" },
    { character: "よ", romaji: "yo" },
    { character: "ら", romaji: "ra" },
    { character: "り", romaji: "ri" },
    { character: "る", romaji: "ru" },
    { character: "れ", romaji: "re" },
    { character: "ろ", romaji: "ro" },
    { character: "わ", romaji: "wa" },
    { character: "を", romaji: "wo" },
    { character: "ん", romaji: "n" },
    // Dakuten variations (が行 to ぽ行)
    { character: "が", romaji: "ga" },
    { character: "ぎ", romaji: "gi" },
    { character: "ぐ", romaji: "gu" },
    { character: "げ", romaji: "ge" },
    { character: "ご", romaji: "go" },
    { character: "ざ", romaji: "za" },
    { character: "じ", romaji: "ji" },
    { character: "ず", romaji: "zu" },
    { character: "ぜ", romaji: "ze" },
    { character: "ぞ", romaji: "zo" },
    { character: "だ", romaji: "da" },
    { character: "ぢ", romaji: "ji" },
    { character: "づ", romaji: "zu" },
    { character: "で", romaji: "de" },
    { character: "ど", romaji: "do" },
    { character: "ば", romaji: "ba" },
    { character: "び", romaji: "bi" },
    { character: "ぶ", romaji: "bu" },
    { character: "べ", romaji: "be" },
    { character: "ぼ", romaji: "bo" },
    { character: "ぱ", romaji: "pa" },
    { character: "ぴ", romaji: "pi" },
    { character: "ぷ", romaji: "pu" },
    { character: "ぺ", romaji: "pe" },
    { character: "ぽ", romaji: "po" },
  ],
};
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const getRandomChar = (currentChar: HiraganaChar | null): HiraganaChar => {
  const availableChars = hiraganaData.hiragana.filter(
    (char) => !currentChar || char.character !== currentChar.character
  );
  return availableChars[Math.floor(Math.random() * availableChars.length)];
};

const generateOptions = (correct: string): string[] => {
  const options = [correct];
  const availableRomaji = hiraganaData.hiragana
    .map((char) => char.romaji)
    .filter((romaji) => romaji !== correct);

  while (options.length < 3) {
    const randomRomaji =
      availableRomaji[Math.floor(Math.random() * availableRomaji.length)];
    if (!options.includes(randomRomaji)) {
      options.push(randomRomaji);
    }
  }

  return shuffleArray(options);
};

const createSparkles = (cardElement: HTMLElement | null) => {
  if (!cardElement) return;

  const sparklesContainer = document.createElement("div");
  sparklesContainer.className = "sparkles";

  for (let i = 0; i < 20; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.animationDelay = `${Math.random() * 0.5}s`;
    sparklesContainer.appendChild(sparkle);
  }

  cardElement.appendChild(sparklesContainer);

  setTimeout(() => {
    sparklesContainer.remove();
  }, 1000);
};

const HiraganaCard: React.FC = () => {
  const [currentChar, setCurrentChar] = useState<HiraganaChar>(() =>
    getRandomChar(null)
  );
  const [options, setOptions] = useState<string[]>([]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [streak, setStreak] = useState(0);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setOptions(generateOptions(currentChar.romaji));
  }, [currentChar]);

  const handleNextCard = useCallback(() => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentChar((prevChar) => getRandomChar(prevChar));
      setSelectedAnswer(null);
      setIsFlipping(false);
      setIsDisabled(false);
    }, 15);
  }, []);

  const handleAnswer = useCallback(
    (answer: string) => {
      if (isDisabled) return;

      setSelectedAnswer(answer);
      setIsDisabled(true);

      if (answer === currentChar.romaji) {
        setStreak((prev) => prev + 1);
        const cardElement = document.querySelector(".card-content");
        createSparkles(cardElement as HTMLElement);

        setTimeout(() => {
          handleNextCard();
        }, 100);
      } else {
        setIsWrongAnswer(true);
        setStreak(0);

        setTimeout(() => {
          setIsWrongAnswer(false);
          handleNextCard();
        }, 200);
      }
    },
    [currentChar.romaji, isDisabled, handleNextCard]
  );

  return (
    <div className="card-container">
      <div
        className={`hiragana-card ${isFlipping ? "flipping" : ""} ${
          isWrongAnswer ? "wrong-answer" : ""
        }`}
      >
        <div className="card-content">
          <div className="streak-counter">Streak: {streak}</div>
          <div className="hiragana">{currentChar.character}</div>
          <div className="options-container">
            {options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedAnswer === option
                    ? option === currentChar.romaji
                      ? "correct"
                      : "incorrect"
                    : ""
                }`}
                onClick={() => handleAnswer(option)}
                disabled={isDisabled}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiraganaCard;
