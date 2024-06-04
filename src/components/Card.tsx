// import React from 'react';
// import { CardItem } from '../types';

// interface CardProps {
//   card: CardItem;
//   onFlip: () => void;
//   flipped: boolean;
// }

// export const Card: React.FC<CardProps> = ({ card, onFlip, flipped }) => {
//   return (
//     <div className={`card ${card.matched ? 'matched' : ''}`} onClick={onFlip}>
//       {card.matched || flipped ? (
//         <img src={card.image} alt="card" />
//       ) : (
//         <div className="card-back"></div>
//       )}
//     </div>
//   );
// };
// src/components/Card.tsx
import React from 'react';
import { CardItem } from '../types';

interface CardProps {
  card: CardItem;
  onFlip: () => void;
  flipped: boolean;
}

export const Card: React.FC<CardProps> = ({ card, onFlip, flipped }) => {
  return (
    <div className='card-parent'  style={{
        backgroundColor: card.color === "blue" ? "rgba(162, 227, 243, 1)"  : "rgba(251, 168, 193, 0.97)",
       
        
      }} >
    <div className={`card ${card.matched ? 'matched' : ''}`} onClick={onFlip}>
      {card.matched || flipped ? (
        <img src={card.image} alt="card" />
      ) : (
        <img src={ card.color==="blue" ?  "../assets/blueheart.png" : "../assets/pinkheart.png"} alt="heart" className="card-back" 
        style={{
            boxShadow: card.color === "blue" ? " 0px 4px 20.8px 0px rgba(57, 201, 236, 1)" : " 0px 4px 17.2px 0px rgba(251, 131, 167, 1)"
        }}
        />
      )}
    </div>
    </div>
  );
};
