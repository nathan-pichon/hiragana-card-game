import React, { useState, useEffect } from 'react';
import { HiraganaChar, baseHiraganaData, dakutenHiraganaData, hiraganaData } from './HiraganaChar';
import { useNavigate } from 'react-router-dom';

export default function Options() {
  const navigate = useNavigate();
  const [selectedChars, setSelectedChars] = useState<string[]>([]);

  // Load selected characters from localStorage on mount
  useEffect(() => {
    const savedSelection = localStorage.getItem('selectedHiragana');
    // Ensure we always get an array even if storage is corrupted
    let initialSelection: string[] = [];
    try {
      if (savedSelection) {
        const parsed = JSON.parse(savedSelection);
        if (Array.isArray(parsed)) {
          initialSelection = parsed;
        }
      }
    } catch (e) {
      console.error('Error parsing selectedHiragana:', e);
    }
    setSelectedChars(initialSelection);
  }, []);

  const toggleSelection = (character: string) => {
    const newSelection = selectedChars.includes(character)
      ? selectedChars.filter(c => c !== character)
      : [...selectedChars, character];
    setSelectedChars(newSelection);
  };

  const toggleRow = (rowChars: HiraganaChar[]) => {
    const rowCharacters = rowChars.map(char => char.character);
    const allSelected = rowCharacters.every(char => selectedChars.includes(char));
    
    setSelectedChars(prev => {
      const next = [...prev];
      rowCharacters.forEach(char => {
        if (allSelected) {
          next.splice(next.indexOf(char), 1);
        } else {
          next.push(char);
        }
      });
      return next;
    });
  };

  const toggleAll = () => {
    setSelectedChars(prev => {
      if (prev.length === hiraganaData.hiragana.length) {
        return [];
      }
      return hiraganaData.hiragana.map(char => char.character);
    });
  };

  const updateSelectedHiragana = (charsToSave: string[]) => {
    if(charsToSave.length > 0) {
      localStorage.setItem('selectedHiragana', JSON.stringify(charsToSave));
    }
  };

  // Save selected characters to localStorage whenever they change
  useEffect(() => {
    updateSelectedHiragana(selectedChars);
  }, [selectedChars]);

  const renderHiraganaTable = (hiraganaSet: HiraganaChar[], title: string) => {
    return (
      <div className="hiragana-table">
        <h2>{title}</h2>
        <table>
          <tbody>
            {hiraganaSet.reduce((rows: HiraganaChar[][], char: HiraganaChar, index: number) => {
              if (index % 5 === 0) rows.push([]);
              rows[rows.length - 1].push(char);
              return rows;
            }, []).map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>
                  <button 
                    className="row-selector"
                    onClick={() => toggleRow(row)}
                    style={{
                      padding: '8px',
                      background: row.every(char => selectedChars.includes(char.character)) ? '#e3f2fd' : '#f5f5f5',
                      border: '2px solid',
                      borderColor: row.every(char => selectedChars.includes(char.character)) ? '#2196f3' : '#ddd',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      margin: '10px',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {row.every(char => selectedChars.includes(char.character)) ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2196f3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                      </svg>
                    )}
                  </button>
                </td>
                {row.map((char) => (
                  <td key={char.character}>
                    <div 
                      className={`hiragana-cell ${selectedChars.includes(char.character) ? 'selected' : ''}`}
                      onClick={() => toggleSelection(char.character)}
                    >
                      <div className="character" translate="no">{char.character}</div>
                      <div className="romaji" translate="no">{char.romaji}</div>
                      {selectedChars.includes(char.character) && (
                        <div className="checkmark">✓</div>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container">
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
        <h1>Options</h1>
      </div>
      <button
          className="select-all-button hover-scale"
          onClick={toggleAll}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: '#f0f0f0',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'block',
            margin: '0 auto',
            marginBottom: '20px'
          }}
        >
          {selectedChars.length === hiraganaData.hiragana.length ? 'Deselect All' : 'Select All'}
        </button>
      <div className="tables-container">
        {renderHiraganaTable(baseHiraganaData.hiragana, "Basic Hiragana")}
        {renderHiraganaTable(dakutenHiraganaData.hiragana, "Dakuten Hiragana")}
      </div>
      <style>{`
          .tables-container {
            display: flex;
            flex-direction: column;
            gap: 40px;
            align-items: center;
          }

          .hiragana-table {
            margin: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .hiragana-table h2 {
            margin-bottom: 20px;
            color: #333;
          }
          
          .hiragana-table table {
            border-collapse: collapse;
          }
          
          .hiragana-cell {
            padding: 10px;
            text-align: center;
            border: 1px solid #ddd;
            min-width: 60px;
            transition: all 0.2s ease;
          }
          
          .hiragana-cell:hover {
            background-color: #f5f5f5;
          }
          
          .hiragana-cell.selected {
            background-color: #e3f2fd;
          }
          
          .character {
            font-size: 24px;
            font-family: "Noto Sans JP", sans-serif;
            margin-bottom: 5px;
          }
          
          .romaji {
            font-size: 14px;
            color: #666;
          }

          .row-selector:hover {
            transform: scale(1.1);
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }

          .select-all-button:hover {
            background: #e0e0e0;
            transform: scale(1.05);
          }
        `}</style>
    </div>
  );
}