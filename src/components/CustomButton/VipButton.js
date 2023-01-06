import React from 'react';
import union from 'src/assets/images/union.png';
import styles from './styles.module.less';
import { Link } from 'react-router-dom';
import { ROUTES } from 'src/constants';

function VipButton({ level }) {
  return (
    <Link to={ROUTES.PROFILE.path} className={styles['btn-vip']}>
      <img src={union} alt="unicon-icon" />
      <span className={styles['vip-text']}>{level}</span>
    </Link>
  );
}

export default VipButton;
