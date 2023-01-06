import React from 'react';
import BitmoonSlider from '../../components/SlickCarousel';
import Header from '../../components/Header';
import StakeEarnWin from './components/StakeEarnWin';
import { Helmet } from 'react-helmet';
import Footer from '../../components/Footer';
import WaveButton from '../../components/CustomButton/WaveButton';
import TransparentButton from '../../components/CustomButton/TransparentButton';
import { useNavigate } from 'react-router-dom';
// style
import styles from './styles.module.less';
import { useViewport } from 'src/hooks/view-port';

function LandingPage() {
  const navigate = useNavigate();
  const onButtonClick = () => {
    navigate('/list');
  };
  const isMobile = useViewport().name === 'tablet';
  return (
    <div className={styles.container}>
      <Helmet>
        <title>Bitmoon Launchpad</title>
      </Helmet>
      <div className={styles['main-content']}>
        <div className={styles.title}>Bitmoon Launchpad</div>
        <div className={styles.description}>
          Bitmoon Launchpad is the platform that brings users the most potential projects in the blockchain ecosystem.
          Usher in the era of DeFi, NFTs, GameFi and Metaverse. Holding BMTD to be qualified to participate in the
          private sales, public sales of the best projects
        </div>
        <div className="buttons">
          <WaveButton title={`${isMobile ? 'View all' : 'View all projects'}`} onClick={onButtonClick} />
        </div>
      </div>
      <div className={styles['slider-block']}>
        <h3 className={styles['slider-title']}>Token Sale Launchpad</h3>
        <p className={styles['slider-description']}>
          Aiming to support potential projects by offering first-look access to quality projects at the early stage.
        </p>
        <BitmoonSlider />
      </div>
      <StakeEarnWin />
    </div>
  );
}

export default LandingPage;
