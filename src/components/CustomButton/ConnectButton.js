import React from 'react';
import cn from 'classnames';
import coin from 'src/assets/images/coin.png';
import Web3Context from 'src/context/web3';
import styles from './styles.module.less';
import { Typography } from 'antd';

const { Text } = Typography;

function ConnectButton() {
  const { account, requestWeb3 } = React.useContext(Web3Context);

  const onConnectButtonClick = (e) => {
    e.preventDefault();
    if (!account) {
      requestWeb3();
    }
  };

  const renderButtonText = () => {
    if (!account) {
      return (
        <a className={cn(styles['btn-coin'], styles['btn-connect'])} href="" onClick={onConnectButtonClick}>
          <span className={styles.coin}>
            <img className={styles['coin-img']} src={coin} alt="coin" />
          </span>
          <span className={styles['coin-text']}>Connect</span>
        </a>
      );
    }
    const start = account.slice(0, 4);
    const end = account.slice(account.length - 5);
    return (
      <a className={styles['btn-coin']} href="">
        <span className={styles.coin}>
          <img className={styles['coin-img']} src={coin} alt="coin" />
        </span>
        <span className={styles['coin-text']}>
          {start}....{end}
        </span>
      </a>
    );
  };

  return <>{renderButtonText()}</>;
}

export default ConnectButton;
