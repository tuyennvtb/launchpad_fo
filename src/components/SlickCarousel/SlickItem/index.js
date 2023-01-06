import React, { useCallback } from 'react';
import { DATE_TIME_FORMAT } from 'src/constants';
import moment from 'moment-timezone';
import cn from 'classnames';
import { COIN_DECIMAL } from 'src/constants';
import miniBanner from 'src/assets/images/mini-baner.png';
import hightLight from 'src/assets/images/hight-light.png';
import styles from '../styles.module.less';
import { useNavigate } from 'react-router-dom';
import { rate as calculateRate, formatMoney } from 'src/utils/formatter';

const DEFAULT_PRICE = Math.pow(10, COIN_DECIMAL);

function SlickItem({ project = {}, className }) {
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
  return (
    <div className={cn(styles['slick-item'], className)} onClick={onNavigate}>
      <span className={styles.status}>{project_type == 1 ? 'public' : 'private'}</span>
      <img src={miniBanner} className={styles['slick-banner']} alt="mini-banner" />
      <img src={hightLight} className={styles['hight-light']} alt="hight-light" />

      <div className={styles['box-content']}>
        <span className={styles['title']}>
          {name} ({token_symbol})
        </span>
        <div className={styles['row-info']}>
          <span className={styles['left-side']}>Total raise</span>
          <span className={styles['right-side']}>
            {formatTotal} {fund_token_symbol}
          </span>
        </div>

        <div className={styles['row-info']}>
          <span className={styles['left-side']}>Rate</span>
          <span className={styles['right-side']}>
            1 {token_symbol} = {rate} {fund_token_symbol}
          </span>
        </div>

        <div className={styles['row-info']}>
          <span className={styles['left-side']}>Supported</span>
          <span className={styles['right-side']}>{fund_token_symbol}</span>
        </div>
        <a href="" className={styles['btn-time-tba']}>
          Time: {time}
        </a>
      </div>
    </div>
  );
}

export default SlickItem;
