import { Menu, Dropdown, Slider } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './styles.module.less';
import './style.css';
import './style.mobile.css';

const CustomDropdown = (props) => {
  return (
    <div className={props.isMobile ? 'custom-slider-mobile' : 'custom-slider'}>
      <Slider {...props.slider} />
    </div>
  );
};
export default CustomDropdown;
