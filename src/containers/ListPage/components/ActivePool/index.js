import React from 'react';
import activePool from 'src/assets/images/active-pool.webp';
import WaveButton from 'src/components/CustomButton/WaveButton';
import RangeBarOrange from '../RangeBarOrange';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.less';
import moment from 'moment-timezone';
import { DATE_TIME_FORMAT, COIN_DECIMAL } from 'src/constants';
import RangeBar from 'src/containers/ListPage/components/RangeBar';
import thumb from 'src/assets/images/thumb.png';
import { rate as calculateRate, formatMoney } from 'src/utils/formatter';
const DEFAULT_PRICE = Math.pow(10, COIN_DECIMAL);

function ClaimButton() {
  return <button className={styles['btn-claim']}>CLAIM IN 1 DAY</button>;
}

function ActivePool({ project }) {
  const navigate = useNavigate();
  if (!project) {
    return null;
  }

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

  const time = sale_time ? moment(sale_time).format(DATE_TIME_FORMAT) : 'TBA';

  const totalRaise = (DEFAULT_PRICE / fundTokenRatio) * (tokenOnSale / DEFAULT_PRICE);

  const formatTotal = formatMoney(totalRaise, 0);

  const tokenOnSaleBN = formatMoney(tokenOnSale / DEFAULT_PRICE, 0);
  const dummyValue = '1230000000000000000000000';
  const rawValue = parseFloat(dummyValue) / DEFAULT_PRICE;
  const percentage = ((parseFloat(dummyValue) * 100) / parseFloat(tokenOnSale)).toFixed(0);
  const onButtonClick = () => {
    navigate(`/project/${project.id}`);
  };
  return (
    <div className={styles['active-pool-container']}>
      <h3>Active pool</h3>
      <div className={styles['active-pull-item']}>
        <div className={styles['active-pull-img']}>
          <span className={styles['community-label']}>COMMUNITY</span>
          <img src={activePool} />
        </div>
        <div className={styles['content']}>
          <span className={styles['title-block']}>
            {name} ({token_symbol})
          </span>
          <div className={styles['active-pool-row']}>
            <span className={styles['left']}>Total raise</span>
            <span className={styles['right']}>
              {' '}
              {formatTotal} {fund_token_symbol}
            </span>
          </div>
          <div className={styles['active-pool-row']}>
            <span className={styles['left']}>Rate</span>
            <span className={styles['right']}>
              {' '}
              1 {token_symbol} = {rate} {fund_token_symbol}
            </span>
          </div>
          <div className={styles['active-pool-row']}>
            <span className={styles['left']}>Supported</span>
            <span className={styles['right']}>{fund_token_symbol}</span>
          </div>
          <div className={styles['active-pool-row']}>
            <span className={styles['left']}>Process</span>
            <span className={styles['right']}>{percentage}%</span>
          </div>
          <div className="custom-active-pool-range">
            <RangeBar disabled percentageValue={percentage} />
          </div>
        </div>
      </div>
      <div className={styles['btn-group']}>
        <ClaimButton />
        <WaveButton title="DETAILS" onClick={onButtonClick} />
      </div>
    </div>
  );
}

export default ActivePool;
