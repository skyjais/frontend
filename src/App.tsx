
import React, { useState, useEffect, useRef } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import WelcomeScreens from './components/WelcomeScreens';
import { GameBoard } from './components/GameBoard';
import { EndScreen } from './components/EndScreen';
import { CardItem, GameData } from './types';
import { shuffleArray } from './utils/shuffle';
import './App.css';
import ProgressBar from './components/ProgressBar';

const App: React.FC = () => {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [tries, setTries] = useState<number>(0);
  const [progress, setProgress] = useState<number>(10);
  const [matches, setMatches] = useState<number>(0);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [message, setMessage] = useState<string>('');
  const [showWelcome, setShowWelcome] = useState<boolean>
  
  (() => {
    return true;
  });
  // (() => {
  //   const savedScreen = localStorage.getItem('showWelcome');

  //   return savedScreen ? JSON.parse(savedScreen) : true;
  // });
  const [timer, setTimer] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch('/data/gameData.json')
      .then(response => response.json())
      .then(data => {
        const gameData: GameData = data;
        const shuffledCards: CardItem[] = shuffleArray(gameData.cards);
        setGameData({ cards: shuffledCards });
      })
      .catch(error => console.error('Error fetching game data:', error));
  }, []);

  useEffect(() => {
    localStorage.setItem('showWelcome', JSON.stringify(showWelcome));
  }, [showWelcome]);

  useEffect(() => {
    if (!showWelcome) {
      console.log('Starting timer');
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        console.log('Clearing timer');
        clearInterval(timerRef.current);
      }
    };
  }, [showWelcome]);

  useEffect(() => {
    if (matches === (gameData?.cards.length ?? 0) / 2) {
      if (timerRef.current) {
        console.log('Stopping timer');
        clearInterval(timerRef.current);
      }
    }
  }, [matches, gameData]);

  const handleCardFlip = (id: number) => {
    const selectedCard = gameData?.cards.find(card => card.id === id);

    if (!selectedCard || flippedCards.includes(id) || flippedCards.length >= 2) return;

    if (flippedCards.length === 0 && selectedCard.color === 'pink') {
      setFlippedCards([id]);
    } else if (flippedCards.length === 1 && selectedCard.color === 'blue') {
      setFlippedCards([...flippedCards, id]);

      const firstCard = gameData?.cards.find(card => card.id === flippedCards[0]);
      if (firstCard && firstCard.fruit === selectedCard.fruit) {
        setGameData(prevData => ({
          ...prevData!,
          cards: prevData!.cards.map(card =>
            card.id === firstCard.id || card.id === selectedCard.id ? { ...card, matched: true } : card
          ),
        }));
        setMatches(prevMatches => prevMatches + 1); // Use functional update for matches
        setMessage("Yeah it's a match");
        setProgress(prevPro => prevPro+15)
        setTimeout(() => setMessage(''), 1000);
      }

      setTimeout(() => {
        setFlippedCards([]);
        setTries(prevTries => prevTries + 1); // Use functional update for tries
      }, 300);
    }
  };

  const startNewGame = () => {
    window.location.reload();
    setShowWelcome(true);
  };

  const goBack = () => {
    window.location.reload();
    setShowWelcome(true);
    setTimer(0);
    if (timerRef.current) {
      console.log('Clearing timer on goBack');
      clearInterval(timerRef.current);
    }
  };

  if (!gameData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <div className="pbar" style={{position:"absolute",top:"1%"}} >
        <ProgressBar  progress={progress} />
      </div>
      {showWelcome ? (
        <WelcomeScreens onComplete={() => setShowWelcome(false)} />
      ) : (
        <>
          <div className="button-container">
            {/* <button onClick={goBack} className="nav-button1">
              <img src="../assets/back.svg" alt="" style={{ width: "107px" }} />
            </button> */}
            <button onClick={startNewGame} className="nav-button2">
              <h1 style={{ fontFamily: "Nunito Sans, sans-serif", width: "137px" }}>New Game</h1>
            </button>
          </div>
          {message && <div className="match-message">{message}</div>}
          {matches === gameData.cards.length / 2 ? (
            <EndScreen bananas={matches} time={timer} />
          ) : (
            <div className='parent'>
              <div>
                <GameBoard cards={gameData.cards.filter(card => card.color === 'pink')} onCardFlip={handleCardFlip} flippedCards={flippedCards} />
              </div>
              <GameBoard cards={gameData.cards.filter(card => card.color === 'blue')} onCardFlip={handleCardFlip} flippedCards={flippedCards} />
            </div>
          )}
          <div style={{ background: "rgba(204,217,26,255)", display:"inline" }}>
            <h2 style={{ color: "red" }}>Tries: {tries}</h2>
            <h2 style={{ color: "red" }}>Time: {Math.floor(timer / 60)}:{('0' + timer % 60).slice(-2)}</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default App;

