import React from 'react';
import cn from 'classnames';
import wave1 from '../../assets/images/wave1.svg';
import wave2 from '../../assets/images/wave2.svg';
import rocket from '../../assets/images/rocket.svg';
import styles from './styles.module.less';

function WaveButton(props) {
  const { title, translate, className, onClick } = props;
  // const style = props.style ? props.style : {width: props.width?props.width:''}
  return (
    <button
      className={cn(translate ? styles['btn-view-all-translate'] : styles['btn-view-all'], className)}
      onClick={onClick}
      // style={style}
    >
      <span className={styles.text}>{title}</span>
      <img src={rocket} className={styles.rocket} alt="rocket" />
      <img src={wave1} className={styles.wave1} alt="wave1" />
      <img src={wave2} className={styles.wave2} alt="wave2" />
    </button>
  );
}

export default WaveButton;
