/* eslint-disable no-mixed-operators */
import React, { useState } from 'react';
import moment from 'moment-timezone';
import CustomDropdown from '../../components/CustomDropdown';
import SearchInput from '../../components/SearchInput';
import CustomSwitch from '../../components/CustomSwitch';
import { useStakingList, useUserTransaction } from 'src/hooks/query';
import Web3Context from 'src/context/web3';
// style
import styles from './styles.module.less';
import components from './components';
import { useViewport } from '../../hooks/view-port';
import { BLOCK_TIMESTAMP } from 'src/constants';

const POOL_STATE = {
  LIVE: 'live',
  FINISHED: 'finished',
};

function StakingPage() {
  const { web3 } = React.useContext(Web3Context);
  const [selectedMenuKey, setSelectedMenuKey] = useState(POOL_STATE.LIVE);
  const [withIDO, setWithIDO] = useState(true);
  const [showMyPool, setShowMyPool] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: stakingList } = useStakingList();
  const { data: transactions } = useUserTransaction(web3);

  const currentStakingPoolID = transactions && transactions.length ? transactions.map((pool) => pool.projectId) : [];
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 768;
  const isTablet = viewPort.width <= 1024;

  const onSearchClick = (e) => {
    setSearchTerm(e.target.value);
  };

  const onSwitchChange = (enable) => {
    setShowMyPool(enable);
  };

  const isPoolFinished = (pool) => {
    const endBlock = pool?.end_block;
    const now = moment();
    const endTimeUnix = (parseInt(endBlock) - 1) * 3 + BLOCK_TIMESTAMP;
    const endTimeMoment = moment.unix(endTimeUnix);

    return now.isSameOrAfter(endTimeMoment);
  };

  // Filter by search
  const searchFiltered =
    searchTerm === ''
      ? stakingList
      : stakingList?.filter((item) => item.stake_token_symbol?.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);

  // Filter IDO
  const filterIDOList = withIDO
    ? searchFiltered?.filter((item) => item.with_ido)
    : searchFiltered?.filter((item) => !item.with_ido);

  const onMenuClick = (selectedKey) => {
    setSelectedMenuKey(selectedKey);
  };

  const onSwitchTabClick = (isWithIDO) => {
    setWithIDO(isWithIDO);
  };
  // Filter POOL Status
  const filterPoolStatusList =
    selectedMenuKey === POOL_STATE.LIVE
      ? filterIDOList?.filter((item) => !isPoolFinished(item))
      : filterIDOList?.filter((item) => isPoolFinished(item));

  // Filter onSwitch change

  const finalStakingList = showMyPool
    ? filterPoolStatusList && filterPoolStatusList.filter((item) => currentStakingPoolID.indexOf(item.id > -1))
    : filterPoolStatusList;

  return (
    <div className={styles['container-staking-page']}>
      {isMobile && <span className={styles['top-header']}>Staking Pools</span>}
      {isMobile && (
        <div className={styles['top-nav-feature-mobile']}>
          <CustomDropdown
            title="Live"
            data={[
              { title: 'Live', value: POOL_STATE.LIVE },
              { title: 'Finished', value: POOL_STATE.FINISHED },
            ]}
            defaultValue={selectedMenuKey}
            onClick={onMenuClick}
          />
        </div>
      )}
      <div className={isMobile ? styles['main-content-mobile'] : styles['main-content']}>
        {isMobile ? (
          <SearchInput isMobile={isMobile} onSearch={onSearchClick} />
        ) : (
          <div className={styles['top-nav-feature']}>
            <CustomDropdown
              title="Live"
              data={[
                { title: 'Live', value: 'live' },
                { title: 'Finished', value: 'finish' },
              ]}
              defaultValue={selectedMenuKey}
              onClick={onMenuClick}
            />
            <span className={styles['right-side']}>
              <CustomSwitch onSwitchChange={onSwitchChange} checked={showMyPool} />
              <span className={styles['switch-content']}>My Staking Pools</span>
              <SearchInput isMobile={isMobile} onSearch={onSearchClick} />
            </span>
          </div>
        )}
        <div className={isMobile ? styles['switch-tabs-header-mobile'] : styles['switch-tabs-header']}>
          <components.SwitchTabsHeader isMobile={isMobile} onClick={onSwitchTabClick} />
        </div>
        <div className={styles['coin-table-container']}>
          {finalStakingList?.length &&
            finalStakingList?.map((item) => (
              <components.CoinCollapseItem isMobile={isMobile} isTablet={isTablet} key={item.id} data={item} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default StakingPage;
