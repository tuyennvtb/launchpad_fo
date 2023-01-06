import React from 'react';
import cn from 'classnames';
import { Slider } from 'antd';
import styles from './styles.module.less';

function RangeBar(props) {
  const { disabled, className, percentageValue = 0 } = props;

  return <Slider className={cn(styles['custom-antd-slider'], className)} value={percentageValue} disabled={disabled} />;
}

export default RangeBar;
