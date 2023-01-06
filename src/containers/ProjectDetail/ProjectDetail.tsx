import * as React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Avatar, Image, Steps, Progress, Tooltip, Tabs, Modal, Button, Spin } from 'antd';
import { ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Parser } from 'html-to-react';
import styles from './styles.module.less';
import moment from 'moment-timezone';
import CustomSlider from '../../components/CustomSlider';
import CustomSteps from '../../components/CustomSteps';
import CustomModal, { showModal } from '../../components/CustomModal';
import components from './components';
import SearchInput from '../../components/SearchInput';
import { useAccountQuery } from 'src/hooks/query';
import Web3Context from 'src/context/web3';
import WaveButton from 'src/components/CustomButton/WaveButton';
import { Statistic } from 'antd';
import {
  useProjectDetailQuery,
  useProjectTransactionQuery,
  useProcessPostPublicSale,
  useProjectPublicDetail,
  useUserStatusQuery,
  useClaimableAmount,
} from 'src/hooks/query';
import { rate as calculateRate, formatBN, formatMoney } from 'src/utils/formatter';
import { COIN_DECIMAL, QUERY_KEY } from 'src/constants';
import { useQueryClient } from 'react-query';
import { useViewport } from '../../hooks/view-port';
const { Countdown } = Statistic;
const DEFAULT_PRICE = Math.pow(10, COIN_DECIMAL);

const POOL_TIMELINE_VALUE = ['Upcoming', 'Swap', 'Filled', 'Claimable', 'End'];
const ProjectDetail: React.FC = () => {
  const { projectId } = useParams();
  console.log('projectId', projectId);
  const viewPort = useViewport();
  const queryClient = useQueryClient();
  const isMobile = viewPort.width <= 768;
  const { web3, account, requestWeb3 } = React.useContext(Web3Context);
  const [switchTab, onSwitchTab] = React.useState(0);
  const userStatus = useAccountQuery(web3);
  const { data: userLevel = '0' } = useUserStatusQuery(web3);

  // project detail - backend
  const { data: projectDetail } = useProjectDetailQuery(projectId);
  const fundTokenRatio = parseInt(projectDetail?.fund_token_ratio || '0');
  const tokenOnSale = parseInt(projectDetail?.token_on_sale || '0');
  const rate = calculateRate(projectDetail?.fund_token_ratio);
  const totalRaise = (DEFAULT_PRICE / fundTokenRatio) * (tokenOnSale / DEFAULT_PRICE);
  const tokenSymbol = projectDetail?.token_symbol;
  const fundTokenSymbol = projectDetail?.fund_token_symbol;
  const preClaimRatio = ((projectDetail?.preclaim_ratio || 0) * 100) / 10000;

  // transaction detail - contract
  const { data: transactionDetail } = useProjectTransactionQuery(web3, projectId, {});
  const rawUserTokenAmount = transactionDetail?.tokenAmount;
  const userTokenAmount = formatBN(COIN_DECIMAL, 0, rawUserTokenAmount);
  const isClaimable = transactionDetail?.processed;
  const lockWallet = transactionDetail?.lockWallet;

  // project public detail - contract
  const { data: projectPublicDetail } = useProjectPublicDetail(web3, projectId);
  const tokenAllocation = projectPublicDetail?.tokenAllocation;
  const rawMaxAllocation = tokenAllocation ? tokenAllocation[parseInt(userLevel)] : '0';
  const maxAllocation = formatBN(COIN_DECIMAL, 0, rawMaxAllocation);

  // Lock Wallet Contract
  const { data: claimableAmount = '0' } = useClaimableAmount(web3, lockWallet);
  const claimableNumber = parseFloat(claimableAmount);

  // Timeline
  const now = moment().utc();
  const saleTime = moment(projectDetail?.sale_time);
  const endTime = moment(projectDetail?.end_time);
  const isUpcoming = now.isBefore(saleTime);
  console.log('saleTime', saleTime);
  console.log('now', now);
  console.log('isUpcoming', isUpcoming);
  const canSwap = now.isAfter(saleTime);
  const isEnd = now.isSameOrAfter(endTime);

  console.group();
  console.log('userStatus', userStatus);
  console.log('transactionDetail', transactionDetail);

  console.log('rawUserTokenAmount', rawUserTokenAmount);
  console.log('projectPublicDetail', projectPublicDetail);
  console.groupEnd();

  const onConnectButtonClick = (e) => {
    e.preventDefault();
    if (!account) {
      requestWeb3();
    }
  };

  const { refetch: refetchProcessPostPublicSale, isLoading: isClaimLoading } = useProcessPostPublicSale(
    web3,
    projectId,
    {
      onSuccess: (receipt) => {
        if (receipt) {
          showModal({ type: 'success', text: 'Transaction submitted' });
          queryClient.invalidateQueries(QUERY_KEY.REQUEST_POST_PUBLIC_SALE);
        }
      },
      onError: (err) => {
        showModal({ type: 'error', text: err });
      },
    },
  );

  console.log('claimableAmount', claimableAmount);

  const onClaimTokenButtonClick = () => {
    refetchProcessPostPublicSale();
  };

  const renderItemInfo = (
    title: string,
    value: string,
    valueAlign?: string,
    highlight?: boolean,
    reverse?: boolean,
  ) => {
    return (
      <div className={reverse ? styles.itemInfoReverse : styles.itemInfo}>
        <div className={valueAlign === 'right' && reverse ? styles.titleRight : styles.title}>{title}</div>
        <div className={valueAlign === 'right' && !reverse ? styles.valueRight : styles.value}>
          <span className={highlight ? styles.highlight : ''}>{value}</span>
        </div>
      </div>
    );
  };
  const renderTopSection = () => {
    return (
      <section className={styles.infoWrapper}>
        <div className={styles.infoContent}>
          <div className={styles.title}>
            <img className={styles.logo} src="https://imgur.com/ILTQLNN.png" alt="" />
            <h2 className={styles.name}>{projectDetail?.name}</h2>
          </div>
          <ul className={styles.additionalInfo}>
            <li className={styles.supportedItem}>
              <img src="/images/BUSD.png" alt="" />
              BUSD
            </li>
            <li className={styles.supportedItem}>
              <img src="/images/icons/bronze-medal.svg" alt="" />
              Dove&nbsp;at Min Tier
            </li>
            <li className={styles.supportedItem}>
              <img src="/images/bsc.svg" alt="" />
              Binance Smart Chain
            </li>
          </ul>
        </div>
        {/* <div className={styles.infoContent}>
          <div className={styles.leftStatus}>
            <div className={styles.statusContent}>
              You are not in <span className={styles.highlight}>Whitelist</span>
            </div>
          </div>
        </div> */}
      </section>
    );
  };
  const renderTopSectionMobile = () => {
    return (
      <section className={styles.topSectionMobile}>
        <div className={styles.infoCoin}>
          <div className={styles.side}>
            <img className={styles.logo} src="https://imgur.com/ILTQLNN.png" alt="" />
          </div>
          <div className={styles.side}>
            <div className={styles.title}>
              <h2 className={styles.name}>{projectDetail?.name}</h2>
            </div>
            <ul className={styles.additionalInfo}>
              <li className={styles.supportedItem}>
                <img src="/images/BUSD.png" alt="" />
                BUSD
              </li>
              <li className={styles.supportedItem}>
                <img src="/images/icons/bronze-medal.svg" alt="" />
                Dove&nbsp;at Min Tier
              </li>
              <li className={styles.supportedItem}>
                <img src="/images/bsc.svg" alt="" />
                Binance Smart Chain
              </li>
            </ul>
          </div>
        </div>
        {/* <div className={styles.infoContent}>
          <div className={styles.leftStatus}>
            <div className={styles.statusContent}>
              You are not in <span className={styles.highlight}>Whitelist</span>
            </div>
          </div>
        </div> */}
      </section>
    );
  };

  const getPoolTimelineStep = () => {
    let step = 'Upcoming';

    console.log('saleTime', saleTime);
    if (isEnd) {
      step = 'End';
    } else if (isClaimable) {
      step = 'Claimable';
    } else if (parseFloat(rawUserTokenAmount) > 0) {
      step = 'Filled';
    } else if (canSwap) {
      step = 'Swap';
    } else if (isUpcoming) {
      step = 'Upcoming';
    }

    console.log('step>>>', step);
    return step;
  };
  const renderPoolTimeline = (isMobile) => {
    const currentStep = getPoolTimelineStep();
    const stepIndex = POOL_TIMELINE_VALUE.indexOf(currentStep);
    const customStep = (
      <CustomSteps
        isMobile={isMobile}
        steps={
          isMobile
            ? {
                current: stepIndex,
                progressDot: true,
                direction: 'vertical',
              }
            : {
                current: stepIndex,
                progressDot: true,
              }
        }
        value={POOL_TIMELINE_VALUE}
      />
    );
    const claimTime = (
      <div className={styles.subHeader}>
        Claim in:
        <div className={styles.time}>25:15:12</div>
      </div>
    );
    return (
      <div className={cn(styles.poolTimeline, styles.projectSection)}>
        <section>
          <div className={styles.headerContainer}>
            <h2 className={styles.header}>POOL TIMELINE</h2>
            {isMobile ? '' : claimTime}
          </div>
          {isMobile ? (
            <div className={styles.contentPoolTimeLine}>
              <div className={styles.container}>{customStep}</div>
              <div className={styles.container}>{claimTime}</div>
            </div>
          ) : (
            ''
          )}
          {isMobile ? '' : customStep}
        </section>
      </div>
    );
  };
  const renderSwapInfo = (isMobile) => {
    const totalToken = formatBN(COIN_DECIMAL, 3, projectDetail?.token_on_sale);
    const formatBuyAmount = formatBN(COIN_DECIMAL, 3, rawUserTokenAmount);
    const percentageVal = (parseFloat(rawUserTokenAmount) / parseFloat(rawMaxAllocation || '1')) * 100;
    const finalPercentageVal = !isNaN(percentageVal) ? percentageVal : 0;
    console.log('percentageVal', percentageVal);
    return (
      <div className={cn(styles.swapInfo, styles.projectSection)}>
        <section>
          <h2 className={styles.header}>SWAP INFO</h2>
          <div className={cn(styles.swapAmount, 'mb-1')}>
            <div className={styles.infoContainer}>
              {renderItemInfo('Amount', formatBuyAmount, '', true)}
              {renderItemInfo(
                'Rate',
                `1 ${projectDetail?.token_symbol} = ${rate} ${projectDetail?.fund_token_symbol}`,
                '',
                true,
              )}
            </div>
          </div>
          <div className={styles.sliderContainer}>
            <CustomSlider slider={{ value: percentageVal, disabled: true }} isMobile={isMobile} />
          </div>
          {renderItemInfo(
            `${formatBuyAmount} / ${totalToken} ${projectDetail?.token_symbol}`,
            `${finalPercentageVal}%`,
            'right',
            false,
            true,
          )}
        </section>
      </div>
    );
  };
  const renderSwapTokens = (isMobile) => {
    return (
      <div className={cn(styles.swapToken, styles.swapTokenSection)}>
        {parseInt(userLevel) > 0 ? (
          <>
            <div className={styles.leftSide}>
              <components.SwapTokenForm data={projectDetail} isMobile={isMobile} />
            </div>
            <div className={styles.rightSide}>
              <h2 className={styles.header}>SWAP TOKEN</h2>
              <div className="card-container">
                {renderItemInfo('Max allocations', `${maxAllocation} ${projectDetail?.token_symbol}`, 'right', true)}
                {renderItemInfo('Have bought', `${userTokenAmount} ${projectDetail?.token_symbol}`, 'right', true)}
              </div>
            </div>
          </>
        ) : (
          <h4 style={{ color: 'white' }}>You must be at least VIP 1 to BUY</h4>
        )}
      </div>
    );
  };
  const renderTokenClaim = () => {
    return (
      <div className={cn(styles.tokenClaim, styles.projectSection)}>
        <Spin spinning={isClaimLoading} size={isMobile ? 'default' : 'large'} />

        <h2 className={styles.header}>TOKEN CLAIM</h2>
        <div className={styles.tokenClaimInfo}>
          {renderItemInfo('Total bought tokens', `${userTokenAmount} ${tokenSymbol}`, '', true)}
          {renderItemInfo('Have bought', `${userTokenAmount} / ${maxAllocation} ${fundTokenSymbol}`, '', true)}
          {renderItemInfo(
            'Claim policy',
            `${preClaimRatio}% unlock at TGE, release after ${projectDetail?.month_lock} month`,
            '',
            false,
          )}
          {renderItemInfo('Claimed', `20,025 / 120,025 ${tokenSymbol}`, '', true)}
          {renderItemInfo('Next to claim', '20 Nov, 2021', '', false)}
        </div>
        <div className={styles.availableToClaimWrapper}>
          <div className={styles.availableToClaim}>
            <div className={styles.titleToClaim}>Available to claim ({preClaimRatio}% ) </div>
            <div className={styles.valueToClaim}>
              {formatBN(COIN_DECIMAL, 0, claimableAmount)} {tokenSymbol}
            </div>
          </div>
        </div>
        {!account ? (
          <div className={styles.availableToClaimWrapper}>
            <WaveButton title="CONNECT TO WALLET" width={'auto'} onClick={onConnectButtonClick} />
          </div>
        ) : claimableNumber > 0 ? (
          <div className={styles.availableToClaimWrapper}>
            <WaveButton title="CLAIM TOKENS" width={'auto'} onClick={onClaimTokenButtonClick} />
          </div>
        ) : null}
      </div>
    );
  };
  const renderProjectDetailInfo = (isMobile) => {
    const description = Parser().parse(projectDetail?.description);
    const data = [
      { addr: '0x6b45edda7c03*************C37177893a17f5' },
      { addr: '0x6b45edda7c03*************C37177893a17f5' },
      { addr: '0x6b45edda7c03*************C37177893a17f5' },
    ];
    const winnerNumber = 0;
    const columns = isMobile
      ? [
          {
            title: 'Wallet Address',
            dataIndex: 'addr',
            align: 'center',
          },
        ]
      : [
          {
            title: 'No',
            dataIndex: 'key',
            align: 'left',
          },
          {
            title: 'Wallet Address',
            dataIndex: 'addr',
            align: 'center',
          },
        ];
    return (
      <div className={cn(styles.poolDetail, styles.projectDetailInfo)}>
        <components.SwitchTabsHeader
          winner={winnerNumber}
          isMobile={isMobile}
          value={switchTab}
          onChangeTab={(data) => {
            onSwitchTab(data);
          }}
        />
        {switchTab === 0 && (
          <div className={styles.content}>
            {renderItemInfo('Total Raise', `${formatMoney(totalRaise, 0)} ${fundTokenSymbol}`, '', false)}
            {renderItemInfo('Website', 'https://gunstar.io/', '', true)}
            {renderItemInfo('Token Claim Time', 'TBA', '', false)}
            {renderItemInfo('Pre-order Start Time', '-', '', false)}
            {renderItemInfo('Lock Schedule', 'View token release schedule', '', true)}
            <div className={styles.infomation}>
              <div className={styles.itemInfo}>
                <div className={styles.title}>Project Information</div>
                <div className={styles.value}>{description}</div>
              </div>
            </div>
          </div>
        )}
        {switchTab === 1 && (
          <div className={styles.content}>
            <SearchInput isMobile={true} />
            <components.ListWinner columns={columns} data={[]} isMobile={isMobile} />
          </div>
        )}
      </div>
    );
  };

  if (!projectDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className={cn(isMobile ? styles.mainMobile : styles.main)}>
      <div className={styles.content}>
        {isMobile ? renderTopSectionMobile() : renderTopSection()}
        {renderPoolTimeline(isMobile)}
        {!isUpcoming && renderSwapInfo(isMobile)}
        {!isUpcoming && renderSwapTokens(isMobile)}
        {!isUpcoming && renderTokenClaim()}
        {!isUpcoming && renderProjectDetailInfo(isMobile)}
      </div>
    </div>
  );
};

export default ProjectDetail;
