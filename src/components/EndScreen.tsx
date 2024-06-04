import React from 'react';

interface EndScreenProps {
  bananas: number;
}

export const EndScreen: React.FC<EndScreenProps> = ({ bananas }) => {
  return (
    <div className="end-screen">
      <h1>Congratulations!</h1>
      <p>You collected {bananas} bananas!</p>
      <img src="/images/banana.png" alt="Banana" />
    </div>
  );
};
