import * as React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { AudioContext } from 'src/context/audio';

type NavItemProps = {
  url: string;
  active?: boolean;
  className?: string;
};

const NavItem: React.FC<NavItemProps> = ({ children, url, active, className }) => {
  const { playBtnSound } = React.useContext(AudioContext);
  const navItemClass = cn({
    'bg-nav-item': !active,
    'bg-nav-item-active': active,
  });
  const handleOnClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    playBtnSound();
  };
  return (
    <Link
      onClick={handleOnClick}
      to={url}
      className={cn(
        navItemClass,
        'flex justify-center items-center hover:bg-nav-item-active bg-contain bg-no-repeat pb-1 2xl:pb-0 w-[166px] h-[58px] 2xl:w-[242px] 2xl:h-[85px] text-base 2xl:text-xl uppercase',
        className,
      )}
    >
      {children}
    </Link>
  );
};

export default NavItem;
