import React, { useCallback } from 'react';
import moment from 'moment-timezone';
import { DATE_TIME_FORMAT, COIN_DECIMAL } from 'src/constants';
import { Row, Col } from 'antd';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import WaveButton from 'src/components/CustomButton/WaveButton';
import RangeBar from 'src/containers/ListPage/components/RangeBar';
import thumb from 'src/assets/images/thumb.png';
import style from './style.css';
import styles from './styles.module.less';
import { rate as calculateRate, formatMoney } from 'src/utils/formatter';
const DEFAULT_PRICE = Math.pow(10, COIN_DECIMAL);

export const ProjectRow = ({ project }) => {
  const navigate = useNavigate();
  const {
    name = 'Theta Arena',
    token_symbol = 'THG',
    project_type,
    fund_token_ratio,
    token_on_sale,
    fund_token_symbol,
    sale_time,
  } = project;
  const fundTokenRatio = parseInt(fund_token_ratio);
  const tokenOnSale = parseInt(token_on_sale);
  const rate = calculateRate(fundTokenRatio);
  const onNavigate = useCallback(() => {
    navigate(`/project/${project.id}`);
  }, [navigate, project.id]);

  const time = sale_time ? moment(sale_time).format(DATE_TIME_FORMAT) : 'TBA';

  const totalRaise = (DEFAULT_PRICE / fundTokenRatio) * (tokenOnSale / DEFAULT_PRICE);
  const formatTotal = formatMoney(totalRaise, 0);

  const tokenOnSaleBN = formatMoney(tokenOnSale / DEFAULT_PRICE, 0);
  const dummyValue = '1230000000000000000000000';
  const rawValue = parseFloat(dummyValue) / DEFAULT_PRICE;
  const percentage = ((parseFloat(dummyValue) * 100) / parseFloat(tokenOnSale)).toFixed(0);

  return (
    <div className={styles['sale-item']} onClick={onNavigate}>
      <div className={styles['group']}>
        <div className={styles['flex-column-center']}>
          <img src={thumb} alt="thumb" className={styles['thumb']} />
        </div>
        <div className={`${styles['flex-column-start']} ${styles['community-info']}`}>
          <button className={styles['btn-community']}>COMMUNITY</button>
          <span className={styles['title-hightlight']}>
            {name} ({token_symbol})
          </span>
        </div>
      </div>
      <div className={`${styles['flex-column-center']} ${styles['total-raise-info']}`}>
        <span className={styles['mini-text']}>Total raise</span>
        <span className={styles['info-hightlight']}>
          {' '}
          {formatTotal} {fund_token_symbol}
        </span>
      </div>
      <div span={2} className={`${styles['flex-column-center']} ${styles['supported-info']}`}>
        <span className={styles['mini-text']}>Supported</span>
        <span className={styles['info-hightlight']}>{fund_token_symbol}</span>
      </div>
      <div className={`${styles['flex-column']} ${styles['last-row']}`}>
        <div className="range-container">
          <RangeBar className={styles['pool-range']} disabled percentageValue={percentage} />
        </div>
        <div className={styles['cell-price']}>
          <span className={styles['info-hightlight']}>{percentage}%</span>
          <span className={styles['price']}>
            {formatMoney(rawValue, 0)} / {tokenOnSaleBN} {token_symbol}
          </span>
        </div>
      </div>
    </div>
  );
};

function Sales({ projects }) {
  const navigate = useNavigate();
  const onClickButton = () => {
    navigate('/all-pools');
  };

  return (
    <div className={styles['sales-container']}>
      <h2 className={styles.title}>Completed Sales</h2>
      <div className={styles['list-item']}>
        {projects.map((item) => {
          return <ProjectRow key={`Sale-${item.id}`} project={item} />;
        })}
      </div>
      <WaveButton title="VIEW ALL POOLS" onClick={onClickButton} />
    </div>
  );
}

export default Sales;
