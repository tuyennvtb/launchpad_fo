import { matchPath } from 'react-router';
import { ROUTES } from 'src/constants';

const checkIsActivePath = (currentPath?: string, pathToCheck?: string) => {
  if (!currentPath || !pathToCheck) {
    return false;
  }

  const match = matchPath(currentPath, pathToCheck);

  if (match?.pathname === ROUTES.HOME.path || match?.pathname === ROUTES.HOME.path) {
    return true;
  }
  if (match !== null) {
    return true;
  }

  return false;
};

export default checkIsActivePath;
