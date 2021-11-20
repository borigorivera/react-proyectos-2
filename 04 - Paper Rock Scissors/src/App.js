import React, { useEffect, useState } from 'react';
import Rock from './icons/Rock';
import Paper from './icons/Paper';
import Scissors from './icons/Scissors';
import './App.css';

const choices = [
  { id: 1, name: 'rock', component: Rock, losesTo: 2 },
  { id: 2, name: 'paper', component: Paper, losesTo: 3 },
  { id: 3, name: 'scissors', component: Scissors, losesTo: 1 },
];
export default function App() {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    restartHandle();
  }, []);

  const handleChoice = (choice) => {
    const chosen = choices.find((c) => c.id === choice);

    setUserChoice(chosen);

    if (chosen.losesTo === computerChoice.id) {
      setLosses((losses) => losses + 1);
      setGameState('lose');
    } else if (computerChoice.losesTo === chosen.id) {
      setWins((wins) => wins + 1);
      setGameState('win');
    } else if (chosen.id === computerChoice.id) {
      setGameState('draw');
    }
  };

  const renderComponent = (choice) => {
    const Component = choice.component;

    return <Component />;
  };

  const restartHandle = () => {
    setGameState(null);
    setUserChoice(null);
    setComputerChoice(null);
    setComputerChoice(choices[Math.floor(Math.random() * choices.length)]);
  };

  return (
    <div className="app">
      {/* information goes here */}
      <div className="info">
        <h2>Rock. Paper. Scissors</h2>

        {/* wins vs losses stats */}
        <div className="wins-losses">
          <div className="wins">
            <span className="number">{wins}</span>
            <span className="text">Wins</span>
          </div>

          <div className="losses">
            <span className="number">{losses}</span>
            <span className="text">Losses</span>
          </div>
        </div>
      </div>

      {/* the popup to show win/loss/draw */}
      {gameState && (
        <div className={`game-state ${gameState}`} onClick={restartHandle}>
          <div>
            <div className="game-state-content">
              <p>{renderComponent(userChoice)}</p>
              <p>{gameState}</p>
              <p>{renderComponent(computerChoice)}</p>
            </div>
          </div>
        </div>
      )}

      <div className="choices">
        {/* choices captions */}
        <div>You</div>
        <div />
        <div>Computer</div>

        {/* buttons for my choice */}
        <div>
          <button className="rock" onClick={() => handleChoice(1)}>
            <Rock />
          </button>
          <button className="paper" onClick={() => handleChoice(2)}>
            <Paper />
          </button>
          <button className="scissors" onClick={() => handleChoice(3)}>
            <Scissors />
          </button>
        </div>

        <div className="vs">vs</div>

        {/* show the computer's choice */}
        <div>
          <button className="computer-choice">?</button>
        </div>
      </div>
    </div>
  );
}
