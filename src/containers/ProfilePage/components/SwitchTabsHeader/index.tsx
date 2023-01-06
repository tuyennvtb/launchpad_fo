import * as React from 'react';
import styles from './styles.module.less';
const SwitchTabsHeader = (props) => {
    // const [isWithIDO, setIsWithIDO] = React.useState(1)

  return (
      <div className={props.isMobile ? styles['container-switch-tabs-header-mobile'] : styles['container-switch-tabs-header']}>
            <div 
            className={styles['left-side']}
            onClick={() => props.onChangeTab(0)}
            >
                <span 
                className={styles['text']} 
                style={{color: props.value ===0  ? '#FFB214' : ''}}
                >MY PROFILE</span>
                {props.value === 0  ? <div className={styles['underline']}></div>: <></>}
            </div>
            <div 
            className={styles['right-side']}
            onClick={() => props.onChangeTab(1)}
            >
                <span 
                className={styles['text']} 
                style={{color: props.value === 1 ? '#FFB214' : ''}}
                >MY POOL</span>
                {props.value === 1  ? <div className={styles['underline']}></div>: <></>}
            </div>
      </div>
  );
};

export default SwitchTabsHeader;