
// import React, { useState, useEffect } from 'react';
// import { GameBoard } from './components/GameBoard';
// import { EndScreen } from './components/EndScreen';
// import { CardItem, GameData } from './types';
// import { shuffleArray } from './utils/shuffle';
// import './App.css';

// const App: React.FC = () => {
//   const [gameData, setGameData] = useState<GameData | null>(null);
//   const [tries, setTries] = useState<number>(0);
//   const [matches, setMatches] = useState<number>(0);
//   const [flippedCards, setFlippedCards] = useState<number[]>([]);

//   useEffect(() => {
//     // Fetch data from JSON or API
//     fetch('/data/gameData.json')
//       .then(response => response.json())
//       .then(data => {

//         const gameData: GameData = data;
//         // Shuffle the cards before setting the game data


//         const shuffledCards = shuffleArray(gameData.cards);
//         setGameData({ cards: shuffledCards });
//       })
//       .catch(error => console.error('Error fetching game data:', error));
//   }, []);

//   const handleCardFlip = (id: number) => {
//     if (flippedCards.length < 2 && !flippedCards.includes(id)) {
//       setFlippedCards([...flippedCards, id]);

//       if (flippedCards.length === 1) {
//         const firstCard = gameData?.cards.find(card => card.id === flippedCards[0]);
//         const secondCard = gameData?.cards.find(card => card.id === id);

//         if (firstCard && secondCard && firstCard.image === secondCard.image) {
//           setGameData(prevData => ({
//             ...prevData!,
//             cards: prevData!.cards.map(card =>
//               card.id === firstCard.id || card.id === secondCard.id ? { ...card, matched: true } : card
//             ),
//           }));
//           setMatches(matches + 1);
//         }

//         setTimeout(() => {
//           setFlippedCards([]);
//           setTries(tries + 1);
//         }, 1000);
//       }
//     }
//   };

//   if (!gameData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="App">
//       {matches === gameData.cards.length / 2 ? (
//         <EndScreen bananas={matches} />
//       ) : (
//         <GameBoard cards={gameData.cards} onCardFlip={handleCardFlip} flippedCards={flippedCards} />
//       )}
//       <div>Tries: {tries}</div>
//     </div>
//   );
// };

// export default App;

// src/App.tsx
// src/App.tsx
import React, { useState, useEffect } from 'react';
import WelcomeScreens from './components/WelcomeScreens';
import { GameBoard } from './components/GameBoard';
import { EndScreen } from './components/EndScreen';
import { CardItem, GameData } from './types';
import { shuffleArray } from './utils/shuffle';
import './App.css';

const App: React.FC = () => {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [tries, setTries] = useState<number>(0);
  const [matches, setMatches] = useState<number>(0);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [message, setMessage] = useState<string>('');
  // const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [showWelcome, setShowWelcome] = useState<boolean>(() => {
    const savedScreen = localStorage.getItem('showWelcome');
    return savedScreen ? JSON.parse(savedScreen) : true;
  });
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
  
  const handleCardFlip = (id: number) => {
    const selectedCard = gameData?.cards.find(card => card.id === id);

    if (!selectedCard || flippedCards.includes(id) || flippedCards.length >= 2) return;

    if (flippedCards.length === 0 && selectedCard.color === 'pink') {
      setFlippedCards([id]);
    } else if (flippedCards.length === 1 && selectedCard.color === 'blue') {
      setFlippedCards([...flippedCards, id]);

      const firstCard = gameData?.cards.find(card => card.id === flippedCards[0]);
      if (firstCard && firstCard.image === selectedCard.image) {
        setGameData(prevData => ({
          ...prevData!,
          cards: prevData!.cards.map(card =>
            card.id === firstCard.id || card.id === selectedCard.id ? { ...card, matched: true } : card
          ),
        }));
        setMatches(matches + 1);
        setMessage("Yeah it's a match");
        setTimeout(() => setMessage(''), 2000);
      }

      setTimeout(() => {
        setFlippedCards([]);
        setTries(tries + 1);
      }, 1000);
    }
  };

  if (!gameData) {
    return <div>Loading...</div>;
  }


//   return (
//     <div className="App">


//       {message && <div className="match-message">{message}</div>}
//       {matches === gameData.cards.length / 2 ? (
//         <EndScreen bananas={matches} />
//       ) : (
//         <div className='parent'>
//           {/* <h2>Pink Cards</h2> */}
//           <div  >
//           <GameBoard cards={gameData.cards.filter(card => card.color === 'pink')} onCardFlip={handleCardFlip} flippedCards={flippedCards}  />
//          </div>
//           {/* <h2>Blue Cards</h2> */}
//           <GameBoard cards={gameData.cards.filter(card => card.color === 'blue')} onCardFlip={handleCardFlip} flippedCards={flippedCards} />
//         </div>
//       )}
//       <div>Tries: {tries}</div>
//     </div>
//   );
// };

// export default App;

return (
  <div className="App">
    {showWelcome ? (
      <WelcomeScreens onComplete={() => setShowWelcome(false)} />
    ) : (
      <>
        {message && <div className="match-message">{message}</div>}
        {matches === gameData.cards.length / 2 ? (
          <EndScreen bananas={matches} />
        ) : (
          <div className='parent'>
                    {/* <h2>Pink Cards</h2> */}
                    <div  >
                  <GameBoard cards={gameData.cards.filter(card => card.color === 'pink')} onCardFlip={handleCardFlip} flippedCards={flippedCards}  />
                  </div>
                     {/* <h2>Blue Cards</h2> */}
                     <GameBoard cards={gameData.cards.filter(card => card.color === 'blue')} onCardFlip={handleCardFlip} flippedCards={flippedCards} />
                   </div>
        )}
        <div>Tries: {tries}</div>
      </>
    )}
  </div>
);
};

export default App;
