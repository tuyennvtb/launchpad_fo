/* eslint-disable no-mixed-operators */
import React, { useState } from 'react';
import cn from 'classnames';
import moment from 'moment-timezone';
import styles from './styles.module.less';
import { Collapse, Input, Button, Spin } from 'antd';
import './style.less';
import './style.mobile.less';
import { CaretRightOutlined } from '@ant-design/icons';
import bitmoonLogo from 'src/assets/images/bitmoon_logo.png';
import underlineImg from 'src/assets/images/staking-devider-img.svg';
import WaveButton from '../../../../components/CustomButton/WaveButton';
import {
  usePendingRewardQuery,
  useApprovalStatusQuery,
  useUserInfoQuery,
  useTotalDeposit,
  useRewardPerBlock,
} from 'src/hooks/query';
import {
  COIN_DECIMAL,
  QUERY_KEY,
  REWARD_INTERVAL,
  TOTAL_REWARD_BLOCK,
  APR_PERCENTAGE,
  STT_CONTRACT,
  USDT_BMT_CONTRACT,
  LP_CONTRACT,
} from 'src/constants';
import Web3Context from 'src/context/web3';
import {
  useRequestApproval,
  useAccountBalanceQuery,
  useRequestStake,
  useRequestUnstake,
  useRequestClaimToken,
} from 'src/hooks/query';
import { formatBN } from 'src/utils/formatter';
import { useQueryClient } from 'react-query';
import { getAmountIn } from 'src/utils/web3';
import { BLOCK_TIMESTAMP, DATE_TIME_FORMAT } from 'src/constants';
import { showModal } from 'src/components/CustomModal';

const { Panel } = Collapse;
const CoinCollapseitem = ({ data, isMobile, isTablet }) => {
  const [balance, setBalance] = useState('');
  const queryClient = useQueryClient();
  const { web3, account, requestWeb3 } = React.useContext(Web3Context);

  const onConnectButtonClick = (e) => {
    e.preventDefault();
    if (!account) {
      requestWeb3();
    }
  };

  const {
    id,
    name,
    smart_chef_contract,
    start_block,
    end_block,
    pool_limit_per_user,
    stake_token,
    reward_token_symbol,
    stake_token_symbol,
    is_lp_staking,
  } = data;

  const startTimeUnix = (parseInt(start_block) - 1) * 3 + BLOCK_TIMESTAMP;

  const endTimeUnix = (parseInt(end_block) - 1) * 3 + BLOCK_TIMESTAMP;
  const formattedStartTime = moment.unix(startTimeUnix).format(DATE_TIME_FORMAT);
  const formattedEndTime = moment.unix(endTimeUnix).format(DATE_TIME_FORMAT);

  const { data: tokenBalance = '0', refetch: refetchAccountBalance } = useAccountBalanceQuery(
    web3,
    stake_token,
    undefined,
    {},
  );

  const { data: sttBalance = '0' } = useAccountBalanceQuery(web3, STT_CONTRACT, LP_CONTRACT, {});

  const { data: usdt_bmt_balance = '0' } = useAccountBalanceQuery(web3, USDT_BMT_CONTRACT, LP_CONTRACT, {});

  const { data: stakeBalance = '0' } = useAccountBalanceQuery(web3, STT_CONTRACT, smart_chef_contract, {});

  const tokenPrice = parseFloat(usdt_bmt_balance) / parseFloat(sttBalance);
  console.log('sttAPR', tokenPrice);
  const {
    data: isApproved,
    isLoading: isLoadingApprovalStatus,
    isSuccess: isLoaddedApprovalStatusSuccess,
    refetch: refetchApprovalStatus,
  } = useApprovalStatusQuery(web3, stake_token, smart_chef_contract);

  const { data: pendingReward, isSuccess } = usePendingRewardQuery(web3, smart_chef_contract, {
    refetchInterval: REWARD_INTERVAL,
  });

  const { data: userInfo, refetch: refetchUserInfo } = useUserInfoQuery(web3, smart_chef_contract, {});

  const { data: totalDeposit = '0' } = useTotalDeposit(web3, smart_chef_contract, {});
  const { data: rewardPerBlock = '0' } = useRewardPerBlock(web3, smart_chef_contract, {});

  const totalPoolAmount = formatBN(COIN_DECIMAL, 0, totalDeposit);

  const stakedAmount = userInfo && userInfo[0];
  console.log('stakedAmount', stakedAmount);
  const { refetch: refetchRequestApproval, isFetching: isRequestingApproval } = useRequestApproval(
    web3,
    stake_token,
    smart_chef_contract,
    {
      onSuccess: (receipt) => {
        if (receipt) {
          showModal({
            type: 'success',
            text: 'Successfully approved',
          });
          refetchApprovalStatus();
          queryClient.invalidateQueries([QUERY_KEY.APPROVE_RECEIPT, stake_token, smart_chef_contract]);
        }
      },
      onError: (err) => {
        showModal({
          type: 'error',
          text: err,
        });
      },
    },
  );

  const { refetch: refetchStake, isFetching: isRequestingStake } = useRequestStake(
    web3,
    smart_chef_contract,
    getAmountIn(balance, COIN_DECIMAL),
    {
      onSuccess: (receipt) => {
        if (receipt) {
          showModal({
            type: 'success',
            text: 'Transaction submitted',
          });
          queryClient.invalidateQueries([QUERY_KEY.REQUEST_STAKE, smart_chef_contract]);
          queryClient.invalidateQueries([QUERY_KEY.PENDING_REWARD, smart_chef_contract]);
          setBalance('');
          refetchUserInfo();
          refetchAccountBalance();
        }
      },
      onError: (err) => {
        showModal({
          type: 'error',
          text: err,
        });
      },
    },
  );

  const { refetch: refetchClaimToken, isFetching: isRequestingClaimToken } = useRequestClaimToken(
    web3,
    smart_chef_contract,
    0,
    {
      onSuccess: (receipt) => {
        if (receipt) {
          showModal({
            type: 'success',
            text: 'Transaction submitted',
          });
          queryClient.invalidateQueries([QUERY_KEY.REQUEST_CLAIM_TOKEN, smart_chef_contract]);
          queryClient.invalidateQueries([QUERY_KEY.PENDING_REWARD, smart_chef_contract]);
          refetchAccountBalance();
        }
      },
      onError: (err) => {
        showModal({
          type: 'error',
          text: err,
        });
      },
    },
  );

  const { refetch: refetchUnstake, isFetching: isRequestingUnstake } = useRequestUnstake(
    web3,
    smart_chef_contract,
    getAmountIn(balance, COIN_DECIMAL),
    {
      onSuccess: (receipt) => {
        if (receipt) {
          showModal({
            type: 'success',
            text: 'Transaction submitted',
          });
          queryClient.invalidateQueries([QUERY_KEY.REQUEST_UNSTAKE, smart_chef_contract]);
          queryClient.invalidateQueries([QUERY_KEY.PENDING_REWARD, smart_chef_contract]);
          setBalance('');
          refetchUserInfo();
          refetchAccountBalance();
        }
      },
      onError: (err) => {
        showModal({
          type: 'error',
          text: err,
        });
      },
    },
  );

  const calculateAPR = () => {
    let apr = 0;
    if (is_lp_staking == 0) {
      const totalStakePool = (parseFloat(stakeBalance) / 10 ** COIN_DECIMAL) * tokenPrice;
      const totalRewardAmount = tokenPrice * TOTAL_REWARD_BLOCK * (parseFloat(rewardPerBlock) / 10 ** COIN_DECIMAL);
      apr = totalStakePool && totalRewardAmount ? (totalRewardAmount * 100) / totalStakePool : 0;
    }

    return apr.toFixed(2);
  };

  function callback(key) {
    console.log(key);
  }

  const onApproveButtonClick = () => {
    refetchRequestApproval();
  };

  const onStakeButtonClick = () => {
    refetchStake();
  };

  const onUnstakeButtonClick = () => {
    const finalStakedAmount = stakedAmount && parseFloat(stakedAmount) / Math.pow(10, COIN_DECIMAL);

    if (!balance || parseFloat(balance) == 0) {
      showModal({
        type: 'error',
        text: 'Unstake value must be greater than zero',
        isShowButton: false,
      });
      return false;
    }

    if (!finalStakedAmount || (finalStakedAmount && parseFloat(balance) > finalStakedAmount)) {
      showModal({
        type: 'error',
        text: 'Unstake value must be less then staked amount',
        isShowButton: false,
      });

      return false;
    }

    refetchUnstake();
  };

  const onClaimTokenButtonClick = () => {
    refetchClaimToken();
  };

  const onMaxBalanceButton = () => {
    const maxTokenBalance = parseFloat(tokenBalance) / Math.pow(10, COIN_DECIMAL);
    setBalance(`${maxTokenBalance.toFixed(3)}`);
  };

  const onChangeBalanceHandler = (e) => {
    const parsedNumber = Number(e.target.value);
    if (isNaN(parsedNumber)) {
      return false;
    }
    setBalance(e.target.value);
  };

  const itemDisplay = (title: string, value: string) => (
    <div className={isTablet ? styles['collapse-header-item-mobile'] : styles['collapse-header-item']}>
      {title !== '' ? <span className={styles['title']}>{title}</span> : <></>}
      <span className={isMobile && title === '' ? styles['content-center'] : styles['content']}>{value}</span>
    </div>
  );
  const customHeader = () => {
    const iconCoin = (isOne = true) => (
      <>
        {isOne ? (
          <div className="icon">
            <img src={bitmoonLogo} height="50" width="50" />
          </div>
        ) : (
          <div className={styles['cols-coin']}>
            <div className={styles['coin']}>
              <img src={bitmoonLogo} height="50" width="50" />
            </div>
            <div className={styles['sub-coin']}>
              <img src={bitmoonLogo} height="50" width="50" />
            </div>
          </div>
        )}
      </>
    );
    return (
      <div className={styles['collapse-header']}>
        {iconCoin(false)}
        {itemDisplay('', stake_token_symbol)}
        {itemDisplay('Earned', `${formatBN(COIN_DECIMAL, 3, pendingReward)} ${reward_token_symbol}`)}
        {itemDisplay('APR', calculateAPR() ? `${calculateAPR()}%` : '-')}
        {itemDisplay('REMAINING', '-')}
        {itemDisplay('Withdrawal delay time', '-')}
      </div>
    );
  };

  const customContent = (isMobile: boolean) => {
    const leftItem = (title, value) => (
      <div className={styles['left-item']}>
        <span className={styles['title']}>{title}</span>
        <span className={styles['value']}>{value}</span>
      </div>
    );
    const rightItem = (title, value) => (
      <div className={isMobile ? styles['right-item-mobile'] : styles['right-item']}>
        <div className={styles['title']}>{title}</div>
        <div className={styles['value']}>{value}</div>
      </div>
    );
    const inputText = () => (
      <React.Fragment>
        <Input className={styles['input']} defaultValue="" value={balance} onChange={onChangeBalanceHandler} />
        <button className={styles['input-btn']} onClick={onMaxBalanceButton}>
          MAX
        </button>
      </React.Fragment>
    );
    const underline = () => {
      return (
        <div className={styles['underline']}>
          <img src={underlineImg} height="13,44" style={{ width: '100%' }} />
        </div>
      );
    };

    return (
      <div className={isTablet ? styles['collapse-content-mobile'] : styles['collapse-content']}>
        <div className={styles['left-side']}>
          {leftItem('Total pool amount', totalPoolAmount)}
          {leftItem('Start time join', formattedStartTime)}
          {leftItem('End time join', formattedEndTime)}
          {leftItem(
            'Stake amount (Max)',
            pool_limit_per_user == 0 ? 'Unlimited' : `${pool_limit_per_user} ${stake_token_symbol}/1 person`,
          )}
        </div>
        {isTablet && underline()}

        <div
          className={cn(styles['middle-side'], {
            [styles['connect-wallet']]: !account ? true : false,
          })}
        >
          <Spin
            spinning={
              isRequestingApproval ||
              isRequestingStake ||
              isRequestingUnstake ||
              isLoadingApprovalStatus ||
              isRequestingClaimToken
            }
            size={isMobile ? 'default' : 'large'}
          />

          {!account ? (
            <div className={styles['button-area']}>
              <div className={styles['button-middle']}>
                <WaveButton title="CONNECT TO WALLET" width={'auto'} onClick={onConnectButtonClick} />
              </div>
            </div>
          ) : (
            <>
              <div className={styles['middle-text']}>
                {itemDisplay('Earned', `${formatBN(COIN_DECIMAL, 3, pendingReward)} ${reward_token_symbol}`)}
              </div>
              <div className={styles['button-middle']}>
                <WaveButton title="CLAIM TOKEN" width={'100%'} onClick={onClaimTokenButtonClick} />
                {/* <TransparentButton title="telegram" /> */}
              </div>
            </>
          )}
        </div>

        {isTablet && underline()}

        <div
          className={cn(styles['right-side'], {
            [styles['connect-wallet']]: !account ? true : false,
          })}
        >
          <Spin
            spinning={
              isRequestingApproval ||
              isRequestingStake ||
              isRequestingUnstake ||
              isLoadingApprovalStatus ||
              isRequestingClaimToken
            }
            size={isMobile ? 'default' : 'large'}
          />

          {!account ? (
            <div className={styles['button-area']}>
              <div className={styles['button-middle']}>
                <WaveButton title="CONNECT TO WALLET" width={'auto'} onClick={onConnectButtonClick} />
              </div>
            </div>
          ) : isApproved ? (
            <div>
              {rightItem('Available Balance', `${formatBN(COIN_DECIMAL, 3, tokenBalance)} ${stake_token_symbol}`)}
              {rightItem(
                `${stake_token_symbol} Staked`,
                `${formatBN(COIN_DECIMAL, 3, stakedAmount || '0')} ${stake_token_symbol}`,
              )}
              <div className={styles['input-middle']}>{inputText()}</div>
              <div className={styles['button-area']}>
                <div className={styles['button-middle']}>
                  <WaveButton title="STAKE" width={'100%'} onClick={onStakeButtonClick} />
                </div>
                <div className={styles['button-right']}>
                  <WaveButton translate title="UNSTAKE" width={'100%'} onClick={onUnstakeButtonClick} />
                </div>
              </div>
            </div>
          ) : (
            <div className={styles['button-area']}>
              <div className={styles['button-middle']}>
                <WaveButton title="APPROVE" width={'auto'} onClick={onApproveButtonClick} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={isTablet ? styles['custom-collapse-container-mobile'] : styles['custom-collapse-container']}>
      <div className={isTablet ? 'custom-collapse-container-mobile' : 'custom-collapse-container'}>
        <Collapse
          defaultActiveKey={['11']}
          onChange={callback}
          expandIconPosition={'right'}
          expandIcon={({ isActive }) => {
            return (
              <div>
                <span className="expanded-text">Details</span>
                <CaretRightOutlined style={isMobile ? { fontSize: 7 } : { fontSize: 15 }} rotate={isActive ? 90 : 0} />
              </div>
            );
          }}
        >
          <Panel header={customHeader()} key={id}>
            {customContent(isMobile)}
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default CoinCollapseitem;
