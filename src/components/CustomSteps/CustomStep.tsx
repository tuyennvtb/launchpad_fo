import { Steps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './styles.module.less';
import './style.css';
import './style.mobile.css';
const { Step } = Steps;

const CustomStep = (props) => {
  return (
    <div className={props.isMobile ? 'custom-steps-mobile' : 'custom-steps'}>
      <div className={props.stepNumber ? 'custom-step-number' : ''}>
        <Steps {...props.steps}>
          {props.value.map((item, index) => {
            const step = props.step
              ? {
                  description:
                    props.step[index] && props.step[index].description ? props.step[index].description : undefined,
                }
              : {};
            return <Step key={item} title={item} {...step} />;
          })}
        </Steps>
      </div>
    </div>
  );
};
export default CustomStep;
