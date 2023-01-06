import { EggRarity, EggType } from 'src/entities/egg';

export const getTypeByElementId = (elementId: string): EggType | undefined => {
  switch (elementId) {
    case '1':
      return 'water';
    case '2':
      return 'fire';
    case '3':
      return 'magic';
    case '4':
      return 'light';
    case '5':
      return 'dark';
    default:
      return;
  }
};

export const getRarityByRarityId = (rarityId: string): EggRarity => {
  switch (rarityId) {
    case '1':
      return 'C';
    case '2':
      return 'B';
    case '3':
      return 'A';
    case '4':
      return 'S';
    case '5':
      return 'SS';
    default:
      return 'C';
  }
};

export const generateRandomElement = () => {
  return Math.floor(1 + Math.random() * 5);
};
