import React, { useEffect, useState, useRef } from 'react';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES, USER_LEVEL_MAPPING } from 'src/constants';
import burgerItem from 'src/assets/images/burger-item.png';
import styles from './styles.module.less';
import CoinButton from '../CustomButton/CoinButton';
import ConnectButton from '../CustomButton/ConnectButton';
import { useUserStatusQuery } from 'src/hooks/query';
import Web3Context from 'src/context/web3';
import VipButton from '../CustomButton/VipButton';
import { Spin } from 'antd';
// function useOnClickOutside(ref, handler) {
//   useEffect(() => {
//     const listener = (event) => {
//       // Do nothing if clicking ref's element or descendent elements
//       if (!ref.current || ref.current.contains(event.target)) {
//         return;
//       }
//       handler(event);
//     };
//     document.addEventListener('mousedown', listener);
//     document.addEventListener('touchstart', listener);
//     return () => {
//       document.removeEventListener('mousedown', listener);
//       document.removeEventListener('touchstart', listener);
//     };
//   }, [ref, handler]);
// }

function BurgerMenu() {
  const ref = useRef();

  const { pathname } = useLocation();
  const [isShow, setIsShow] = useState(false);

  function onToggleMenu() {
    setIsShow(!isShow);
  }
  const { web3 } = React.useContext(Web3Context);
  const { data, isLoading } = useUserStatusQuery(web3);
  return (
    <div onClick={onToggleMenu} className={styles['burger-menu']}>
      <div
        ref={ref}
        className={cn(styles['menu-list'], {
          [styles['menu-active']]: isShow,
        })}
      >
        <Link
          to={ROUTES.SWAP.path}
          className={cn(styles['menu-item'], {
            [styles['item-active']]: pathname === ROUTES.SWAP.path,
          })}
        >
          Swap
        </Link>
        <Link
          to={ROUTES.LANDING.path}
          className={cn(styles['menu-item'], {
            [styles['item-active']]: pathname === ROUTES.LANDING.path,
          })}
        >
          Launchpad
        </Link>
        <Link
          to={ROUTES.LIST.path}
          className={cn(styles['menu-item'], {
            [styles['item-active']]: pathname === ROUTES.LIST.path,
          })}
        >
          Pool
        </Link>
        <Link
          to={ROUTES.STAKING.path}
          className={cn(styles['menu-item'], {
            [styles['item-active']]: pathname === ROUTES.STAKING.path,
          })}
        >
          Staking
        </Link>
        <Link
          to={ROUTES.LENDING.path}
          className={cn(styles['menu-item'], {
            [styles['item-active']]: pathname === ROUTES.LENDING.path,
          })}
        >
          Lending
        </Link>
        <Spin spinning={isLoading} />
        {data ? <VipButton level={USER_LEVEL_MAPPING[parseInt(data)]} /> : null}
        <ConnectButton />
      </div>
      <a href="#" className={styles['menu-icon']}>
        <img src={burgerItem} className={styles['burger-img']} />
        <img src={burgerItem} className={styles['burger-img']} />
        <img src={burgerItem} className={styles['burger-img']} />
      </a>
    </div>
  );
}

export default BurgerMenu;
