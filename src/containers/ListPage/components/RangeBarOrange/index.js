import React from 'react';
import { Slider } from 'antd';
import styles from './styles.module.less';

function RangeBar(props) {
  const { disabled } = props;
  return (
    <Slider className={styles['custom-antd-slider']} defaultValue={30} disabled={disabled} />
  )
}

export default RangeBar;
