type LevelKey = 0 | 1 | 2 | 3 | 4 | 5;
export type USER_LEVEL = {
  // eslint-disable-next-line no-unused-vars
  [key in LevelKey]: string;
};

export const USER_LEVEL_MAPPING: USER_LEVEL = {
  1: 'VIP 1',
  2: 'VIP 2',
  3: 'VIP 3',
  4: 'VIP 4',
  5: 'VIP 5',
  0: 'BASIC',
};
