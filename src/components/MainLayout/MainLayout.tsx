import * as React from 'react';
import { Helmet } from 'react-helmet';
import cn from 'classnames';
import FloatingButton from '../FloatingButton';
import NavBar from '../NavBar';
import { useLocation, matchPath } from 'react-router-dom';
import { ROUTES } from 'src/constants';
import styles from './Main.module.less';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';

const MainLayout: React.FC = ({ children }) => {
  const { pathname } = useLocation();

  const routes = Object.values(ROUTES);

  const documentButtonClick = () => {};

  const mainClass = cn({
    [styles.main]: true,
  });

  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
