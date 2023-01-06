/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';

export type AudioContextProps = {
  playBtnSound: () => void;
  playDefeatSound: () => void;
  playVictorySound: () => void;
  playBgMusic: () => void;
  playAttackSound: () => void;
  stopAttackSound: () => void;
  playCongratSound: () => void;
};

const initialState: AudioContextProps = {
  playBtnSound: () => {},
  playDefeatSound: () => {},
  playVictorySound: () => {},
  playBgMusic: () => {},
  playAttackSound: () => {},
  stopAttackSound: () => {},
  playCongratSound: () => {},
};

export const AudioContext = React.createContext(initialState);
