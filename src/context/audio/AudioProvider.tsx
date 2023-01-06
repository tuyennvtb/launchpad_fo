import * as React from 'react';
import ButtonClickSound from 'src/assets/audio/btn.wav';
import VictorySound from 'src/assets/audio/victory.wav';
import DefeatSound from 'src/assets/audio/defeat.wav';
import BackgroundMusic from 'src/assets/audio/bg.wav';
import AttackSoundC from 'src/assets/audio/at-c.wav';
import AttackSoundA from 'src/assets/audio/at-a.wav';
import CongratSound from 'src/assets/audio/congrats.wav';
import { AudioContext } from './audio';

const victoryAudioElement = new Audio(VictorySound);
const defeatAudioElement = new Audio(DefeatSound);
const bgAudioElement = new Audio(BackgroundMusic);

const attackSoundCElement = new Audio(AttackSoundC);
const attackSoundAElement = new Audio(AttackSoundA);

const congratSoundElement = new Audio(CongratSound);

export const AudioProvider: React.FC = ({ children }) => {
  React.useEffect(() => {
    defeatAudioElement.preload = 'auto';
    defeatAudioElement.volume = 0.6;
    victoryAudioElement.preload = 'auto';
    victoryAudioElement.volume = 0.6;

    bgAudioElement.preload = 'auto';
    bgAudioElement.volume = 0.2;

    attackSoundCElement.preload = 'auto';
    attackSoundCElement.loop = true;
    attackSoundCElement.volume = 0.05;

    attackSoundAElement.preload = 'auto';
    attackSoundAElement.loop = true;
    attackSoundAElement.volume = 0.05;

    congratSoundElement.preload = 'auto';
    congratSoundElement.volume = 0.6;
  }, []);

  const playBgMusic = React.useCallback(async () => {
    try {
      await bgAudioElement.play();
    } catch (e: any) {
      console.log(e.message);
    }
  }, []);

  const playBtnSound = React.useCallback(async () => {
    try {
      const btnAudioElement = new Audio(ButtonClickSound);
      btnAudioElement.preload = 'auto';
      btnAudioElement.volume = 0.05;
      await btnAudioElement.play();
    } catch (e: any) {
      console.log(e.message);
    }
  }, []);

  const playDefeatSound = React.useCallback(async () => {
    try {
      await defeatAudioElement.play();
    } catch (e: any) {
      console.log(e.message);
    }
  }, []);

  const playVictorySound = React.useCallback(async () => {
    try {
      await victoryAudioElement.play();
    } catch (e: any) {
      console.log(e.message);
    }
  }, []);

  const playAttackSound = React.useCallback(async () => {
    try {
      await attackSoundCElement.play();
      await attackSoundAElement.play();
    } catch (e: any) {
      console.log(e.message);
    }
  }, []);

  const stopAttackSound = React.useCallback(async () => {
    try {
      await attackSoundCElement.pause();
      await attackSoundAElement.pause();
    } catch (e: any) {
      console.log(e.message);
    }
  }, []);

  const playCongratSound = React.useCallback(async () => {
    try {
      await congratSoundElement.play();
    } catch (e: any) {
      console.log(e.message);
    }
  }, []);

  return (
    <AudioContext.Provider
      value={{
        playBtnSound,
        playDefeatSound,
        playVictorySound,
        playBgMusic,
        playAttackSound,
        stopAttackSound,
        playCongratSound,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
