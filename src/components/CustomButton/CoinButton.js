import React from 'react';
import coin from 'src/assets/images/coin.png';
import styles from './styles.module.less';

function CoinButton() {
  const coinStr = '0x25....564E2';
  return (
    <>
      <a className={styles['btn-coin']} href="">
        <span className={styles.coin}>
          <img className={styles['coin-img']} src={coin} alt="coin" />
        </span>
        <span className={styles['coin-text']}>{coinStr}</span>
      </a>
      <p className={styles['vip-text']}>(VIP1)</p>
    </>
  );
}

export default CoinButton;
