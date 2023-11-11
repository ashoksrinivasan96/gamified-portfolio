import './App.css';
import Canvas from '../src/components/Canvas'
import MainMenu from './components/MainMenu';
import { useState } from 'react';


const App = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    // Add any additional logic to initialize the game
  };

  return (
    <div className="app">
      {!gameStarted ? (
        <MainMenu startGame={startGame} />
      ) : (
        <Canvas />
      )}
    </div>
  );
};

export default App;

