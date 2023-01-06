import * as React from 'react';
import cn from 'classnames';
import styles from './styles.module.less';
import CustonSteps from '../../components/CustomSteps';
import components from './components';
import SearchInput from '../../components/SearchInput';
import Web3Context from 'src/context/web3';
import WaveButton from 'src/components/CustomButton/WaveButton';
import { rate as calculateRate, formatBN } from 'src/utils/formatter';
import { USER_LEVEL_MAPPING } from 'src/constants';
import accountTierGBImg from '../../assets/images/account-tier-point.svg';
import { useNavigate } from 'react-router-dom';
import { useUserStatusQuery, useUserTransaction, useStakingIDO } from 'src/hooks/query';
import { useViewport } from '../../hooks/view-port';

const ProjectDetail: React.FC = () => {
  const { web3 } = React.useContext(Web3Context);
  const { data: userLevel = '0', isLoading } = useUserStatusQuery(web3);
  const { data: transactions } = useUserTransaction(web3);
  // const { data: stakingIDO } = useStakingIDO();

  const navigate = useNavigate();
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 768;
  const data = [{ type: 'BMTD - BNB', walletBalance: '50,021,240 BMTD', staked: '1010,021,240 BMTD' }];
  const columns = isMobile
    ? [
        {
          title: 'Wallet Address',
          dataIndex: 'type',
          align: 'center',
        },
      ]
    : [
        {
          title: 'Type',
          dataIndex: 'type',
          align: 'center',
          render: (text: string) => (
            <div className="custom-table">
              <div className={styles.cols}>
                <div>{text}</div>
              </div>
            </div>
          ),
        },
        {
          title: 'Wallet Balance',
          dataIndex: 'walletBalance',
          align: 'center',
          render: (text: string) => (
            <div className="custom-table" style={{ textAlign: 'inherit' }}>
              {text}
            </div>
          ),
        },
        {
          title: 'Staked',
          dataIndex: 'staked',
          align: 'center',
          render: (text: string) => (
            <div className="custom-table" style={{ textAlign: 'inherit' }}>
              {text}
            </div>
          ),
        },
      ];
  const [tab, onChangeTab] = React.useState(0);
  const renderTieSection = (isMobile) => {
    const tierTextItem = (title, value) => (
      <div className={styles.tierTextItem}>
        <div className={styles.title}>{title}</div>
        <div className={styles.value}>{value}</div>
      </div>
    );
    return (
      <section className={styles.tieSection}>
        <div className={styles.header}>Your Tier</div>
        <div className={styles.tierWrapper}>
          <div className={styles.tierNumber}>
            <img src={accountTierGBImg} height={173} width={173} />
            <div className={styles.tierNumberValue}>1</div>
          </div>
          {tierTextItem('Current tier', USER_LEVEL_MAPPING[parseInt(userLevel)])}
          {tierTextItem('BMTD left to next tier', '500,000 BMTD')}
          {tierTextItem('Total stake', '5,000,000 BMTD')}
        </div>
      </section>
    );
  };
  const renderStakingSection = (isMobile) => {
    return (
      <section className={styles.stakingSection}>
        <div className={styles.header}>Staking infomation</div>
        <div className={styles.content}>
          <components.ListWinner columns={columns} data={data} isMobile={isMobile} />
        </div>
      </section>
    );
  };
  const renderStepSection = (isMobile) => {
    return (
      <section className={styles.stepSection}>
        <div className={styles.content}>
          <CustonSteps
            isMobile={isMobile}
            steps={
              isMobile
                ? {
                    current: 0,
                    progressDot: true,
                    direction: 'vertical',
                  }
                : {
                    current: 1,
                    progressDot: true,
                  }
            }
            step={[
              { description: '1' },
              { description: '2' },
              { description: '3' },
              { description: '4' },
              { description: '5' },
            ]}
            stepNumber
            value={['500 BMTD', '50,000 BMTD', '5,000,000 BMTD', '5,000,000 BMTD', '5,000,000 BMTD']}
          />
        </div>
      </section>
    );
  };
  return (
    <div className={cn(isMobile ? styles.mainMobile : styles.main)}>
      <div className={styles.content}>
        <div className={styles.headerContainer}>My account</div>
        <div className={styles.projectDetailInfo}>
          <div className={styles.switchTab}>
            <components.SwitchTabsHeader isMobile={isMobile} value={tab} onChangeTab={(value) => onChangeTab(value)} />
          </div>
          {tab === 0 && (
            <>
              {renderTieSection(isMobile)}
              {renderStepSection(isMobile)}
              {renderStakingSection(isMobile)}
              <div className={styles.buttonSubmit}>
                <WaveButton
                  title="GO TO STAKE"
                  width={'auto'}
                  onClick={() => {
                    navigate('/staking');
                  }}
                />
              </div>
            </>
          )}
          {tab === 1 && (
            <>
              <div className={styles.myPoolsTab}>
                <SearchInput isMobile={true} />
                <components.ListWinner columns={columns} data={data} isMobile={isMobile} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
