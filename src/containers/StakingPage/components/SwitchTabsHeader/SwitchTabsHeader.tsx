import * as React from 'react';
import cn from 'classnames';
import styles from './styles.module.less';
const SwitchTabsHeader = (props) => {
  const [withIDO, setWithIDO] = React.useState(true);

  const onButtonClick = (value) => {
    setWithIDO(value);
    props.onClick && props.onClick(value);
  };
  return (
    <div
      className={
        props.isMobile ? styles['container-switch-tabs-header-mobile'] : styles['container-switch-tabs-header']
      }
    >
      <div className={styles['left-side']} onClick={() => onButtonClick(true)}>
        <span
          className={cn(styles['text'], {
            [styles['active-item']]: withIDO,
          })}
        >
          WITH IDO
        </span>
      </div>
      <div className={styles['right-side']} onClick={() => onButtonClick(false)}>
        <span
          className={cn(styles['text'], {
            [styles['active-item']]: !withIDO,
          })}
        >
          WITHOUT IDO
        </span>
      </div>
    </div>
  );
};

export default SwitchTabsHeader;
