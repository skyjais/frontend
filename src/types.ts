// src/types.ts
export interface CardItem {
    id: number;
    color: 'pink' | 'blue';
    image: string;
    matched: boolean;
  }
  
  export interface GameData {
    cards: CardItem[];
  }
  