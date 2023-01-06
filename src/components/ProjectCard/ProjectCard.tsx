import * as React from 'react';
import cn from 'classNamenames';
import { AudioContext } from 'src/context/audio';

export type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'transparent' | 'ghost';
  size?: 'large' | 'medium' | 'small' | 'extra-small';
  isGhost?: boolean;
  isOutline?: boolean;
  isLink?: boolean;
  isWide?: boolean;
  isBlock?: boolean;
  isCircle?: boolean;
  isSquare?: boolean;
  isRounded?: boolean;
  isActive?: boolean;
  isLoading?: boolean;
  noAnimation?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ProjectCard: React.FC<ButtonProps> = ({
  variant,
  size,
  isOutline,
  isLink,
  isWide,
  isBlock,
  isCircle,
  isSquare,
  isRounded,
  isActive,
  isLoading,
  noAnimation,
  children,
  disabled,
  onClick,
  ...rest
}) => {
  return (
    <a className="jss219" href="#/buy-token/120">
      <div className="jss220">
        <div className="jss221">
          <img src="https://imgur.com/2Sp42Jt.png" alt="" className="" />
          <div className="jss225">
            <div className="jss226">Public</div>
          </div>
        </div>
        <div className="jss228">
          <div className="jss222">
            <div className="card-content__title">
              <p className="">DopeWarZ IDO (DRUG)</p>
            </div>
            <div className="jss223">
              <img src="/images/bsc.svg" alt="" />
            </div>
          </div>
          <ul className="card-content__content">
            <li className="">
              <span className="">Total Raise</span>
              <span className="total">123,000 $</span>
            </li>
            <li>
              <span>Rate</span>
              <span className="total">1&nbsp;DRUG&nbsp;=&nbsp;0.03 &nbsp;BUSD</span>
            </li>
            <li className="">
              <span>Supported</span>
              <span className="total">BUSD</span>
            </li>
          </ul>
          <a className="jss224" href="#/buy-token/120">
            Launch in&nbsp;
            <img src="/images/icons/icon_btn_pool.svg" alt="" />
            <div className="jss229">22h : 07m</div>
          </a>
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;
