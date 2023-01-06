import React from 'react';
import telegram from '../../assets/images/telegram.png';
import styles from './styles.module.less';

function TransparentButton(props) {
  const { title } = props;
  return (
    <a href="#" className={styles['btn-social']}>
      <img src={telegram} alt="telegram" className={styles['social-img']} />
      <span className={styles['social-text']}>{title}</span>
    </a>
  );
}

export default TransparentButton;
