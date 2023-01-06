import * as React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Avatar, Image, Steps, Progress, Tooltip, Tabs } from 'antd';
import components from './components';
import styles from './styles.module.less';
import SearchInput from '../../components/SearchInput';
import CustomSlider from 'src/components/CustomSlider';
import avt from '../../assets/images/thumb.png';
import { useViewport } from '../../hooks/view-port';
const AllPoolsPage: React.FC = (props) => {
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 768;
  const data = [
    { userName: 'Mythera (THG)', ratio: '0.003 BUSD', access: 'Community', progress: 60, status: 'upcomming' },
    { userName: 'Mythera (THG)', ratio: '0.003 BUSD', access: 'Community', progress: 70, status: 'upcomming' },
    { userName: 'Mythera (THG)', ratio: '0.003 BUSD', access: 'Community', progress: 30, status: 'upcomming' },
    { userName: 'Mythera (THG)', ratio: '0.003 BUSD', access: 'Community', progress: 20, status: 'upcomming' },
    { userName: 'Mythera (THG)', ratio: '0.003 BUSD', access: 'Community', progress: 10, status: 'upcomming' },
    { userName: 'Mythera (THG)', ratio: '0.003 BUSD', access: 'Community', progress: 60, status: 'upcomming' },
    { userName: 'Mythera (THG)', ratio: '0.003 BUSD', access: 'Community', progress: 70, status: 'upcomming' },
    { userName: 'Mythera (THG)', ratio: '0.003 BUSD', access: 'Community', progress: 30, status: 'upcomming' },
    { userName: 'Mythera (THG)', ratio: '0.003 BUSD', access: 'Community', progress: 20, status: 'upcomming' },
    { userName: 'Mythera (THG)', ratio: '0.003 BUSD', access: 'Community', progress: 10, status: 'upcomming' },
    { userName: 'Mythera (THG)', ratio: '0.003 BUSD', access: 'Community', progress: 30, status: 'upcomming' },
    { userName: 'Mythera (THG)', ratio: '0.003 BUSD', access: 'Community', progress: 20, status: 'upcomming' },
    { userName: 'Mythera (THG)', ratio: '0.003 BUSD', access: 'Community', progress: 10, status: 'upcomming' },
  ];
  const columns = isMobile
    ? [
        {
          title: 'Ratio',
          dataIndex: 'ratio',
          align: 'center',
          render: (text: string) => (
            <div className="custom-table" style={{ textAlign: 'inherit' }}>
              <div className={styles.cols}>
                <span className={styles.defaultText}>{text}</span>
              </div>
            </div>
          ),
        },
        {
          title: 'Progress',
          dataIndex: 'progress',
          align: 'center',
          render: (text: string) => (
            <div className="custom-table" style={{ textAlign: 'inherit' }}>
              <div className={styles.cols}>
                <span className={styles.progressValue}>{`${text}%`}</span>
                <div className={styles.slider}>
                  <CustomSlider />
                </div>
              </div>
            </div>
          ),
        },
        {
          title: 'Status',
          dataIndex: 'status',
          align: 'center',
          render: (text: string) => (
            <div className="custom-table" style={{ textAlign: 'inherit' }}>
              <div className={styles.cols}>
                <span className={styles.statusText}>{text}</span>
              </div>
            </div>
          ),
        },
      ]
    : [
        {
          title: 'Pool name',
          dataIndex: 'userName',
          align: 'left',
          render: (text: string) => (
            <div className="custom-table">
              <div className={styles.userCols}>
                <div className={styles.avt}>
                  <img src={avt} height={49} width={49} />
                </div>
                <div className={styles.name}>{text}</div>
              </div>
            </div>
          ),
        },
        {
          title: 'Ratio',
          dataIndex: 'ratio',
          align: 'center',
          render: (text: string) => (
            <div className="custom-table" style={{ textAlign: 'inherit' }}>
              <div className={styles.cols}>
                <span className={styles.defaultText}>{text}</span>
              </div>
            </div>
          ),
        },
        {
          title: 'Access',
          dataIndex: 'access',
          align: 'center',
          render: (text: string) => (
            <div className="custom-table" style={{ textAlign: 'inherit' }}>
              <div className={styles.cols}>
                <span className={styles.defaultText}>{text}</span>
              </div>
            </div>
          ),
        },
        {
          title: 'Progress',
          dataIndex: 'progress',
          align: 'center',
          render: (text: string) => (
            <div className="custom-table" style={{ textAlign: 'inherit' }}>
              <div className={styles.cols}>
                <span className={styles.progressValue}>{`${text}%`}</span>
                <div className={styles.slider}>
                  <CustomSlider />
                </div>
              </div>
            </div>
          ),
        },
        {
          title: 'Status',
          dataIndex: 'status',
          align: 'center',
          render: (text: string) => (
            <div className="custom-table" style={{ textAlign: 'inherit' }}>
              <div className={styles.cols}>
                <span className={styles.statusText}>{text}</span>
              </div>
            </div>
          ),
        },
      ];

  const renderTopSection = (isMobile) => {
    return (
      <div className={styles.headerContainer}>
        <SearchInput isMobile={isMobile} />
      </div>
    );
  };
  const renderPoolsCard = (item) => {
    const renderTextItem = (title, value) => {
      return (
        <div className={styles.textItem}>
          <div className={styles.title}>{title}</div>
          <div className={styles.value}>{value}</div>
        </div>
      );
    };
    return (
      <div className={styles.renderPoolsCard}>
        <div className={styles.user}>
          <div className={styles.avt}>
            <img src={avt} height={79} width={79} />{' '}
          </div>
          <div className={styles.infomation}>
            <div className={styles.name}>Bemil ( THG)</div>
            <div className={styles.status}>COMMUNITY</div>
          </div>
        </div>
        {columns.map((cols) => renderTextItem(cols.title, item[cols.dataIndex]))}
        <div className={styles.slider}>
          <CustomSlider isMobile={true} />
        </div>
        <div className={styles.lastText}>{'1,251,125 / 2,251,125 THG'}</div>
      </div>
    );
  };
  return (
    <div className={cn(isMobile ? styles.mainMobile : styles.main)}>
      <div className={styles.content}>
        {renderTopSection(isMobile)}
        <div className={styles.projectDetailInfo}>
          {!isMobile && <div className={styles.header}>ALL POOLS</div>}
          <div className={styles.content}>
            {!isMobile && <components.ListWinner columns={columns} data={data} isMobile={isMobile} />}
            {isMobile && data.map((item) => renderPoolsCard(item))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPoolsPage;
