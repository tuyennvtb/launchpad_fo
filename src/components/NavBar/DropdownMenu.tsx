import * as React from 'react';
import cn from 'classnames';
import MenuItemActiveDot from 'src/assets/common/menu-item-active-dot.png';
import AccountButton from './AccountButton';
import { ROUTES } from 'src/constants';
import { Link } from 'react-router-dom';
import checkIsActivePath from 'src/utils/routing';
const routeKeys: string[] = Object.keys(ROUTES);

type DropdownMenuProps = {
  pathname?: string;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ pathname }) => {
  return (
    <ul>
      <li className="flex flex-col justify-center items-center">
        <div className="w-full px-3">
          <AccountButton />
        </div>
        <div className="bg-menu-divider bg-cover w-full h-3 mt-2" />
      </li>
      {routeKeys.map((key, i) => {
        const { path, name, showedOnNavBar } = ROUTES[key];
        const isActive = checkIsActivePath(pathname, path);
        const itemActiveClass = cn({
          'bg-menu-item bg-contain bg-no-repeat bg-center text-primary-content h-[33px] max-h-[33px] leading-[27px]':
            isActive,
        });

        if (!showedOnNavBar) {
          return null;
        }

        return (
          <li key={i} className="flex jus items-center mx-3 my-2">
            <div className="w-[12px] mb-2 flex-grow">
              {isActive ? (
                <img alt="" src={MenuItemActiveDot} width={12} height={22} />
              ) : (
                <div className="w-[18px] h-[28px] flex-grow" />
              )}
            </div>
            <Link to={path} className={cn(itemActiveClass, 'text-base-content text-center text-base w-full')}>
              {name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default DropdownMenu;
