import React, { useState } from 'react';
import cn from 'classnames';
import { Input, Spin, Tabs } from 'antd';
import styles from './styles.module.less';
import './style.css';
import './style.mobile.css';
import { useQueryClient } from 'react-query';
import Web3Context from 'src/context/web3';
import {
  useApprovalStatusQuery,
  useRequestApproval,
  useProcessPublicSale,
  useAccountBalanceQuery,
} from 'src/hooks/query';
import { QUERY_KEY, LAUNCHPAD_CONTRACT, COIN_DECIMAL } from 'src/constants';
import WaveButton from 'src/components/CustomButton/WaveButton';
import { getAmountIn } from 'src/utils/web3';
import { formatBN, calculateTokenAmount } from 'src/utils/formatter';
import { showModal } from 'src/components/CustomModal';

const { TabPane } = Tabs;
const SwapTokenForm = ({ data, isMobile }) => {
  const [swapAmount, setSwapAmount] = useState('0');
  const queryClient = useQueryClient();
  const { fund_token_address, fund_token_symbol, fund_token_ratio, token_symbol, id: projectId } = data;
  const { web3, account, requestWeb3 } = React.useContext(Web3Context);
  const { data: isApproved, refetch: refetchApprovalStatus } = useApprovalStatusQuery(
    web3,
    fund_token_address,
    LAUNCHPAD_CONTRACT,
  );

  const onConnectButtonClick = (e) => {
    e.preventDefault();
    if (!account) {
      requestWeb3();
    }
  };

  const amount = getAmountIn(swapAmount, COIN_DECIMAL);

  const { data: tokenBalance, refetch: refetchAccountBalance } = useAccountBalanceQuery(
    web3,
    fund_token_address,
    undefined,
    {},
  );
  console.log('amount', tokenBalance);
  const { refetch: refetchRequestApproval, isFetching: isRequestingApproval } = useRequestApproval(
    web3,
    fund_token_address,
    LAUNCHPAD_CONTRACT,
    {
      onSuccess: (receipt) => {
        if (receipt) {
          showModal({ type: 'success', text: 'Successfully approve' });
          queryClient.invalidateQueries(QUERY_KEY.APPROVE_RECEIPT);
          refetchApprovalStatus();
        }
      },
      onError: (err) => {
        showModal({ type: 'error', text: err });
      },
    },
  );

  const { refetch: refetchProcessPublicSale, isFetching: isProcessingPublicSale } = useProcessPublicSale(
    web3,
    projectId,
    amount,
    {
      onSuccess: (receipt) => {
        if (receipt) {
          showModal({ type: 'success', text: 'Transaction submitted' });
          queryClient.invalidateQueries(QUERY_KEY.REQUEST_PUBLIC_SALE);
          refetchAccountBalance();
        }
      },
      onError: (err) => {
        showModal({ type: 'error', text: err });
      },
    },
  );

  const handleAmountChange = (e) => {
    setSwapAmount(e.target.value);
  };

  const handleMaxValue = () => {
    const maxAmount = Number(tokenBalance) / Math.pow(10, COIN_DECIMAL);
    setSwapAmount(`${maxAmount}`);
  };

  const approveButtonClick = () => {
    refetchRequestApproval();
  };

  const swapButtonClick = () => {
    refetchProcessPublicSale();
  };
  const renderContent = () => {
    return (
      <div className={styles['tab-content']}>
        <Spin spinning={isRequestingApproval || isProcessingPublicSale} size={isMobile ? 'default' : 'large'} />
        {/* <Spin spinning={true} size={isMobile ? 'default' : 'large'} /> */}
        <div className={styles['text-item']}>
          <div className={styles['title']}>Available</div>
          <div className={styles['value']}>
            {formatBN(COIN_DECIMAL, 3, tokenBalance)} {fund_token_symbol}
          </div>
        </div>
        <div className={styles['input-text']}>
          <Input
            className={cn(styles['input'], {
              disabled: !isApproved,
            })}
            value={swapAmount}
            onChange={handleAmountChange}
          />
          <div className={styles['input-btn']}>
            <span className={styles['input-unit']}>{fund_token_symbol}</span>
            <button className={styles['btn']} onClick={handleMaxValue}>
              MAX
            </button>
          </div>
        </div>
        <div className={styles['text-item-value']}>
          <div className={styles['title']}>You will get</div>
          <div className={styles['value']}>
            {calculateTokenAmount(swapAmount, fund_token_ratio)} {token_symbol}
          </div>
        </div>
        <div className={styles['tab-content-submit-btn']}>
          <WaveButton title="SWAP" width={'auto'} onClick={swapButtonClick} />
        </div>
      </div>
    );
  };

  return (
    <>
      {!account ? (
        <div className="swap-topken-custom-tabs text-center">
          <Spin spinning={isRequestingApproval} size={isMobile ? 'default' : 'large'} />
          <WaveButton title="CONNECT TO WALLET" width={'auto'} onClick={onConnectButtonClick} />
        </div>
      ) : isApproved ? (
        <div
          className={
            isMobile
              ? styles['project-detail-swap-token-form-container-mobile']
              : styles['project-detail-swap-token-form-container']
          }
        >
          <div className={isMobile ? 'swap-topken-custom-tabs-mobile' : 'swap-topken-custom-tabs'}>
            {renderContent()}
          </div>
        </div>
      ) : (
        <div className="swap-topken-custom-tabs text-center">
          <Spin spinning={isRequestingApproval} size={isMobile ? 'default' : 'large'} />
          <WaveButton title="APPROVE" width={'auto'} onClick={approveButtonClick} />
        </div>
      )}
    </>
  );
};

export default SwapTokenForm;
