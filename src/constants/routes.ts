type RouteKey = 'HOME' | 'ABOUT';

export type Route = {
  // eslint-disable-next-line no-unused-vars
  [key: string]: {
    path: string;
    name: string;
    title?: string;
    showedOnNavBar?: boolean;
  };
};

export const ROUTES: Route = {
  HOME: {
    path: '/',
    name: 'HOME',
    showedOnNavBar: true,
  },
  ABOUT: {
    path: '/about',
    name: 'ABOUT',
    showedOnNavBar: true,
  },
  LANDING: {
    path: '/landing',
    name: 'LANDING',
  },
  LIST: {
    path: '/list',
    name: 'LIST',
  },
  STAKING: {
    path: '/staking',
    name: 'STAKING',
  },
  POOL: {
    path: '/pool',
    name: 'POOL',
  },
  PROJECT_DETAIL: {
    path: '/project',
    name: 'PROJECT_DETAIL',
  },
  ALL_POOLS: {
    path: '/all-pools',
    name: 'ALL_POOLS',
  },
  PROFILE: {
    path: '/profile',
    name: 'PROFILE',
  },
  SWAP: {
    path: '/swap',
    name: 'SWAP',
  },
  LENDING: {
    path: '/lending',
    name: 'LENDING',
  },
};
