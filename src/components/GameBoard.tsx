// src/components/GameBoard.tsx
import React from 'react';
import { Card } from './Card';
import { CardItem } from '../types';

interface GameBoardProps {
  cards: CardItem[];
  onCardFlip: (id: number) => void;
  flippedCards: number[];
}

export const GameBoard: React.FC<GameBoardProps> = ({ cards, onCardFlip, flippedCards }) => {
  return (
    
    <div className="game-board">
      {cards.map(card => (
        <Card key={card.id} card={card} onFlip={() => onCardFlip(card.id)} flipped={flippedCards.includes(card.id)} />
      ))}
    </div>
    
  );
};
