import * as React from 'react';
import cn from 'classnames';

type CountDownTimerProps = {
  timestamp?: number;
};

const CountDownTimer: React.FC<CountDownTimerProps> = ({ timestamp = 0 }) => {
  const countdownClass = cn({
    'bg-nav-clock-empty': timestamp === 0,
    'bg-nav-clock-active': timestamp > 0,
  });
  return (
    <div
      className={cn(
        countdownClass,
        'flex justify-end items-center bg-contain bg-no-repeat w-[214px] h-[98px] md:w-[252px] md:h-[110px]',
      )}
    >
      <div className="w-2/3 pl-4 pr-10 mt-3 md:mt-7">
        <p className="text-xs md:text-xl leading-4">TIME</p>
        <progress
          className="appearance-none overflow-hidden relative w-full h-3 rounded-box"
          value="50"
          max="100"
        ></progress>
        <p className="text-right -mt-1 md:mt-0 text-2xs">Remain: 1:20:10</p>
      </div>
    </div>
  );
};

export default CountDownTimer;
