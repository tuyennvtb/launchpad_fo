import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from 'src/constants';
import AccountButton from './AccountButton';
import NavItem from './NavItem';
import checkIsActivePath from 'src/utils/routing';

const routeKeys = Object.keys(ROUTES);

const NavBar: React.FC = ({ children }) => {
  const { pathname } = useLocation();
  const [tooltipVisible, setTooltipVisible] = React.useState(false);

  React.useEffect(() => {
    setTooltipVisible(false);
  }, [pathname]);

  const onTooltipVisibleChange = (visible: boolean) => {
    setTooltipVisible(visible);
  };

  const renderNavItems = () => {
    return routeKeys.map((key, i) => {
      const { path, name, showedOnNavBar } = ROUTES[key];
      if (!showedOnNavBar) {
        return null;
      }

      return (
        <NavItem
          key={i}
          url={path}
          active={checkIsActivePath(pathname, path)}
          className="mx-4 2xl:mx-8 lg:flex-none first:ml-4 2xl:first:ml-8 last:mr-0"
        >
          {name}
        </NavItem>
      );
    });
  };

  return (
    <div className="navbar pt-4 px-2 items-start lg:items-center lg:pt-12 xl:pb-10">
      <div className="hidden lg:flex lg:w-[65%] 2xl:w-auto px-2 mx-2 lg:px-0 lg:mx-0 2xl:px-2 2xl:mx-2 navbar-center">
        <div className="flex justify-center items-stretch lg:flex-wrap lg:w-[90%] xl:w-auto">{renderNavItems()}</div>
      </div>
      <div className="w-[60%] navbar-end">
        <AccountButton />
      </div>
    </div>
  );
};

export default NavBar;
