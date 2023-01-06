import { Menu, Dropdown } from 'antd';
import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import styles from './styles.module.less';
import './style.less';

const CustomDropdown = (props) => {
  const DEFAULT_VALUE = props.defaultValue;
  const selectedItem = DEFAULT_VALUE ? props.data.find((item) => item.value === DEFAULT_VALUE) : props.data[0];
  const [dropDownSelectedItem, setDropdownSelectedItem] = useState(selectedItem);

  const onButtonClick = (e) => {
    const key = e.key;
    const selectedData = props.data.find((item) => item.value === key);
    setDropdownSelectedItem(selectedData);
    props.onClick && props.onClick(key);
  };

  const menu = (
    <Menu onClick={onButtonClick} selectedKeys={props.selectedKeys}>
      {props.data.map((item) => (
        <Menu.Item title={item.title} key={item.value}>
          <a target="_blank" key={item.title} rel="noopener noreferrer" href="#" onClick={(e) => e.preventDefault()}>
            {item.title}
          </a>
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown overlayClassName={'custom-dropdown-overlay'} overlay={menu}>
      <a className={styles['custom-dropdown']} onClick={(e) => e.preventDefault()}>
        {dropDownSelectedItem.title}
        <span className={styles['custom-dropdown-icon']}>
          <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.5 12L0.0048084 0.750001L12.9952 0.75L6.5 12Z" fill="#FFB214" />
          </svg>
        </span>
      </a>
    </Dropdown>
  );
};
export default CustomDropdown;
