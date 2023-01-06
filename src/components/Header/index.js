import React from 'react';
import VipButton from 'src/components/CustomButton/VipButton';
import CoinButton from 'src/components/CustomButton/CoinButton';
import ConnectButton from 'src/components/CustomButton/ConnectButton';
import BurgerMenu from 'src/components/BurgerMenu';
import { Link, useHistory } from 'react-router-dom';
import bitmoon from 'src/assets/images/bitmoon.png';
import styles from './styles.module.less';
import { useUserStatusQuery } from 'src/hooks/query';
import { USER_LEVEL_MAPPING } from 'src/constants';
import { ROUTES } from 'src/constants';
import { useLocation, matchPath } from 'react-router-dom';

import Web3Context from 'src/context/web3';
import cn from 'classnames';
import { Spin, Skeleton } from 'antd';

function Header() {
  const { pathname } = useLocation();

  const isActive = pathname;
  const { web3 } = React.useContext(Web3Context);
  const { data, isLoading } = useUserStatusQuery(web3);
  return (
    <header className={styles.header}>
      <div className={styles['header-container']}>
        <Link to={ROUTES.HOME.path}>
          <img className={styles['bitmoon-logo']} src={bitmoon} alt="" />
        </Link>

        <ul className={styles['menu-list']}>
          <li
            className={cn(styles['menu-item'], {
              [styles['item-active']]: pathname === ROUTES.SWAP.path,
            })}
          >
            <Link className={styles['menu-text']} to={ROUTES.SWAP.path}>
              Swap
            </Link>
          </li>
          <li
            className={cn(styles['menu-item'], {
              [styles['item-active']]: pathname === ROUTES.LANDING.path || pathname === ROUTES.HOME.path,
            })}
          >
            <Link className={styles['menu-text']} to={ROUTES.LANDING.path}>
              Launchpad
            </Link>
          </li>
          <li
            className={cn(styles['menu-item'], {
              [styles['item-active']]: pathname === ROUTES.LIST.path,
            })}
          >
            <Link className={styles['menu-text']} to={ROUTES.LIST.path}>
              Pool
            </Link>
          </li>

          <li
            className={cn(styles['menu-item'], {
              [styles['item-active']]: pathname === ROUTES.STAKING.path,
            })}
          >
            <Link className={styles['menu-text']} to={ROUTES.STAKING.path}>
              Staking
            </Link>
          </li>
          <li
            className={cn(styles['menu-item'], {
              [styles['item-active']]: pathname === ROUTES.LENDING.path,
            })}
          >
            <Link className={styles['menu-text']} to={ROUTES.LENDING.path}>
              Lending
            </Link>
          </li>
        </ul>
        <div className={styles['btn-group']}>
          <Spin spinning={isLoading}>{data ? <VipButton level={USER_LEVEL_MAPPING[parseInt(data)]} /> : null}</Spin>
          <ConnectButton />
        </div>
        <BurgerMenu />
      </div>
    </header>
  );
}

export default Header;
