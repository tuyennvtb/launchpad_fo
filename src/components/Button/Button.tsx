import * as React from 'react';
import cn from 'classnames';
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

const Button: React.FC<ButtonProps> = ({
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
  className,
  disabled,
  onClick,
  ...rest
}) => {
  const { playBtnSound } = React.useContext(AudioContext);
  const btnClass = cn({
    btn: true,
    'btn-primary text-base-content': variant === 'primary',
    'btn-secondary text-base-content': variant === 'secondary',
    'btn-accent': variant === 'accent',
    'btn-info': variant === 'info',
    'btn-success': variant === 'success',
    'btn-warning': variant === 'warning',
    'btn-error': variant === 'error',
    'btn-lg': size === 'large',
    'btn-md': size === 'medium',
    'btn-sm': size === 'small',
    'btn-xs': size === 'extra-small',
    'btn-ghost bg-transparent hover:bg-transparent border-2 hover:border-opacity-100 border-base-content rounded-xs leading-[1] min-h-[28px] h-[28px] 2xl:min-h-[42px] 2xl:h-[42px] 2xl:text-xl':
      variant === 'ghost',
    'text-base-content outline-none border-none bg-transparent hover:bg-transparent': variant === 'transparent',
    'btn-outline': isOutline,
    'btn-link': isLink,
    'btn-wide': isWide,
    'btn-block': isBlock,
    'btn-circle': isCircle,
    'btn-square': isSquare,
    'rounded-btn': isRounded,
    'bg-primary hover:bg-primary focus:bg-primary text-base-content': isActive,
    'btn-disabled': disabled,
    'no-animation': noAnimation,
    loading: isLoading,
  });

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    playBtnSound();
    onClick && onClick(e);
  };

  return (
    <button className={cn(btnClass, className)} disabled={disabled} onClick={handleOnClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
