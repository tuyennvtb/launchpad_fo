import React from 'react';
import WaveButton from '../../../../components/CustomButton/WaveButton';
import stakeEarnWin from '../../../../assets/images/stake-earn-win.png';
import styles from './styles.module.less';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

function StakeEarnWin() {
  const navigate = useNavigate();
  const onButtonClick = () => {
    navigate('/staking');
  };
  return (
    <div className={styles['stake-container']}>
      <div className={styles['stake-left']}>
        <h6 className={styles.title}>Staking Pools</h6>
        <p className={styles.description}>
          Earning by staking BMTD or join multiple attractive staking pools from projects on Bitmoon Network.
        </p>
        <WaveButton
          translate
          title="Stake"
          onClick={onButtonClick}
          className={cn(styles['hide-mobile'], 'justify-content-center align-items-center')}
        />
      </div>
      <div>
        <img className={styles['stake-banner']} src={stakeEarnWin} alt="stake-earn-win" />
      </div>
      <WaveButton
        translate
        title="Stake"
        onClick={onButtonClick}
        className={cn(styles['show-mobile'], 'justify-content-center align-items-center')}
      />
    </div>
  );
}

export default StakeEarnWin;
