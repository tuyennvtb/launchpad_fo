import * as React from 'react';
import cn from 'classnames';
import styles from './styles.module.less';
const SwitchTabsHeader = (props) => {
  // const [isWithIDO, setIsWithIDO] = React.useState(1)

  return (
    <div
      className={
        props.isMobile ? styles['container-switch-tabs-header-mobile'] : styles['container-switch-tabs-header']
      }
    >
      <div className={styles['left-side']} onClick={() => props.onChangeTab(0)}>
        <span
          className={cn(styles['text'], {
            [styles['active-item']]: props.value === 0,
          })}
          style={{ color: props.value === 0 ? '#FFB214' : '' }}
        >
          POOL DETAILS
        </span>
      </div>
      <div className={styles['right-side']} onClick={() => props.onChangeTab(1)}>
        <span
          className={cn(styles['text'], {
            [styles['active-item']]: props.value === 1,
          })}
          style={{ color: props.value === 1 ? '#FFB214' : '' }}
        >
          WINNER ({props.winner})
        </span>
      </div>
    </div>
  );
};

export default SwitchTabsHeader;
