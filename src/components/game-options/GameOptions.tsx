import React, { useState, useEffect } from "react";
import { HiraganaChar, hiraganaData } from "../../services/hiragana-characters";
import { useNavigate } from "react-router-dom";
import "./GameOptions.css";
import { ReactComponent as CheckIcon } from "../../assets/icons/check-icon.svg";
import { ReactComponent as CircleIcon } from "../../assets/icons/circle-icon.svg";
import { ReactComponent as BackIcon } from "../../assets/icons/back-icon.svg";

export default function GameOptions() {
  const navigate = useNavigate();
  const [selectedChars, setSelectedChars] = useState<string[]>([]);

  useEffect(() => {
    const savedSelection = localStorage.getItem("selectedHiragana");
    let initialSelection: string[] = [];
    try {
      if (savedSelection) {
        const parsed = JSON.parse(savedSelection);
        if (Array.isArray(parsed)) {
          initialSelection = parsed;
        }
      }
    } catch (e) {
      console.error("Error parsing selectedHiragana:", e);
    }
    setSelectedChars(initialSelection);
  }, []);

  const toggleSelection = (character: string) => {
    const newSelection = selectedChars.includes(character)
      ? selectedChars.filter((c) => c !== character)
      : [...selectedChars, character];
    setSelectedChars(newSelection);
  };

  const toggleRow = (rowChars: HiraganaChar[]) => {
    const rowCharacters = rowChars.map((char) => char.character);
    const allSelected = rowCharacters.every((char) =>
      selectedChars.includes(char),
    );

    setSelectedChars((prev) => {
      if (allSelected) {
        // Deselect all characters in the row
        return prev.filter((char) => !rowCharacters.includes(char));
      } else {
        // Select all characters in the row
        return Array.from(new Set([...prev, ...rowCharacters]));
      }
    });
  };

  const toggleAll = () => {
    setSelectedChars((prev) => {
      if (prev.length === hiraganaData.hiragana.length) {
        return [];
      }
      return hiraganaData.hiragana.map((char) => char.character);
    });
  };

  const updateSelectedHiragana = (charsToSave: string[]) => {
    if (charsToSave.length > 0) {
      localStorage.setItem("selectedHiragana", JSON.stringify(charsToSave));
    }
  };

  useEffect(() => {
    updateSelectedHiragana(selectedChars);
  }, [selectedChars]);

  const renderHiraganaTable = (hiraganaSet: HiraganaChar[], title: string) => {
    return (
      <div className="game-options-hiragana-table">
        <h2 className="game-options-hiragana-table-title">{title}</h2>
        <div className="game-options-hiragana-grid">
          {hiraganaSet
            .reduce(
              (rows: HiraganaChar[][], char: HiraganaChar, index: number) => {
                if (index % 5 === 0) rows.push([]);
                rows[rows.length - 1].push(char);
                return rows;
              },
              [],
            )
            .map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <div className="game-options-row-selector-container">
                  <button
                    className={`game-options-row-selector ${
                      row.every((char) =>
                        selectedChars.includes(char.character),
                      )
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => toggleRow(row)}
                  >
                    {row.every((char) =>
                      selectedChars.includes(char.character),
                    ) ? (
                      <CheckIcon />
                    ) : (
                      <CircleIcon />
                    )}
                  </button>
                </div>
                {row.map((char) => (
                  <div
                    key={char.character}
                    className={`game-options-hiragana-cell ${
                      selectedChars.includes(char.character) ? "selected" : ""
                    }`}
                    onClick={() => toggleSelection(char.character)}
                  >
                    <div className="game-options-character">
                      {char.character}
                    </div>
                    <div className="game-options-romaji">{char.romaji}</div>
                    {selectedChars.includes(char.character) && (
                      <div className="game-options-checkmark">✓</div>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className="game-options-container">
      <div className="game-options-header">
        <button
          className="game-options-back-button"
          onClick={() => navigate("/")}
          aria-label="Back"
        >
          <BackIcon />
        </button>
        <h1>Options</h1>
      </div>
      <button className="game-options-select-all-button" onClick={toggleAll}>
        {selectedChars.length === hiraganaData.hiragana.length
          ? "Deselect All"
          : "Select All"}
      </button>
      <div className="game-options-tables-container">
        {renderHiraganaTable(hiraganaData.regularHiragana, "Basic Hiragana")}
        {renderHiraganaTable(hiraganaData.dakutenHiragana, "Dakuten Hiragana")}
      </div>
    </div>
  );
}
