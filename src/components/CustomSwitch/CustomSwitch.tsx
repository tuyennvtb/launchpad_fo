import * as React from 'react';
import './style.css';
import { Switch } from 'antd';

const CustomSwitch = (props) => {
  const onChange = (value) => {
    props.onSwitchChange && props.onSwitchChange(value);
  };

  return (
    <span className="custom-switch-container">
      <Switch checked={props.checked} onChange={onChange} />
    </span>
  );
};

export default CustomSwitch;
