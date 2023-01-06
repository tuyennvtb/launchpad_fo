import React from 'react';
import WaveButton from '../CustomButton/WaveButton';
import bitmoon from '../../assets/images/bitmoon-logo.png';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.less';
import { exampleData } from './exampleData';

function Footer() {
  const navigate = useNavigate();
  const onApplyToLaunchClick = () => {
    navigate('/');
  };
  return (
    <div className={styles.footer}>
      <h3 className={styles.title}>Ready to launch your project on Bitmoon?</h3>
      <div className={styles.description}>
        Bitmoon offers a network of tier-1 marketing partners to get your project in front of the investors and provides
        a unique frictionless token sale process.
      </div>
      <WaveButton title="APPLY TO LAUNCH" onClick={onApplyToLaunchClick} />
      <img className={styles['bitmoon-logo']} src={bitmoon} alt="bitmoon-logo" />
      <ul className={styles.socials}>
        {exampleData.map((item) => {
          return (
            <li key={item.name} className={styles['social-item']}>
              <a href={item.url} target="_blank">
                <img src={item.src} alt={item.name} className={styles['social-image']} />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Footer;
