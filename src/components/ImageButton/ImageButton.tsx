import * as React from 'react';
import cn from 'classnames';
import { AudioContext } from 'src/context/audio';

export type ImageButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'danger-lite'
  | 'info'
  | 'info-wide'
  | 'warn'
  | 'warn-wide'
  | 'outline'
  | 'transparent';

export type ImageButtonProps = {
  variant?: ImageButtonVariant;
  size?: 'large' | 'medium' | 'small' | 'extra-small';
  isLoading?: boolean;
  noAnimation?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ImageButton: React.FC<ImageButtonProps> = ({
  variant,
  size,
  disabled,
  isLoading,
  noAnimation,
  children,
  className,
  onClick,
  ...rest
}) => {
  const { playBtnSound } = React.useContext(AudioContext);
  const btnClass = cn({
    'btn text-base-content btn-ghost bg-contain bg-center bg-no-repeat hover:bg-transparent border-0 !shadow-none !outline-none':
      true,
    'bg-primary-btn': variant === 'primary',
    'bg-secondary-btn': variant === 'secondary',
    'bg-danger-btn text-primary-content': variant === 'danger',
    'bg-danger-lite-btn text-primary-content': variant === 'danger-lite',
    'bg-info-btn text-primary-content': variant === 'info',
    'bg-info-wide-btn text-primary-content': variant === 'info-wide',
    'bg-warn-wide-btn': variant === 'warn-wide',
    'bg-warn-btn': variant === 'warn',
    'bg-outline-btn text-primary-content': variant === 'outline',
    'outline-none': variant === 'transparent',
    'w-[130px] h-[38px] min-h-[38px] pb-[3px]':
      size === 'small' && (variant === 'primary' || variant === 'secondary' || variant === 'danger'),
    'w-[130px] xl:w-[142px] 2xl:w-[200px] h-[38px] min-h-[38px] 2xl:h-[52px] 2xl:min-h-[52px] pb-[3px]':
      size === 'small' && variant === 'info-wide',
    'w-[130px] xl:w-[142px] 2xl:w-[200px] h-[28px] min-h-[28px] 2xl:h-[52px] 2xl:min-h-[52px]':
      size === 'small' && variant === 'warn-wide',
    'w-[70px] h-[31px] min-h-[31px] md:w-[77px] md:h-[32px] md:min-h-[32px] 2xl:w-[103px] 2xl:h-[45px] 2xl:min-h-[45px] xl:text-2xs':
      size === 'small' &&
      (variant === 'info' || variant === 'warn' || variant === 'outline' || variant === 'danger-lite'),
    'text-xs 2xl:text-base': size === 'small',
    'w-[188px] h-[54px] sm:w-[229px] sm:h-[63px] 2xl:w-[319px] 2xl:h-[89px] text-lg 2xl:text-4xl pb-1':
      size === 'medium',
    'no-animation': noAnimation,
    'grayscale !bg-transparent': disabled,
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

export default ImageButton;
