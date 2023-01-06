import * as React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';
import About from 'src/app/About';
import StakingPage from 'src/containers/StakingPage';
import LandingPage from 'src/containers/LandingPage';
import ListPage from 'src/containers/ListPage';
import ProjectDetail from 'src/containers/ProjectDetail';
import { ROUTES } from 'src/constants';
import AllPoolsPage from 'src/containers/AllPoolsPage';
import ProfilePage from 'src/containers/ProfilePage';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path={`${ROUTES.PROJECT_DETAIL.path}/:projectId`} element={<ProjectDetail />}></Route>
      <Route path={`${ROUTES.HOME.path}`} element={<LandingPage />}></Route>
      <Route path={`${ROUTES.ABOUT.path}`} element={<About />}></Route>
      <Route path={`${ROUTES.LANDING.path}`} element={<LandingPage />}></Route>
      <Route path={`${ROUTES.LIST.path}`} element={<ListPage />}></Route>
      <Route path={`${ROUTES.STAKING.path}`} element={<StakingPage />}></Route>
      <Route path={`${ROUTES.ALL_POOLS.path}`} element={<AllPoolsPage />}></Route>
      <Route path={`${ROUTES.PROFILE.path}`} element={<ProfilePage />}></Route>
      <Route path={`${ROUTES.SWAP.path}`} element={<LandingPage />}></Route>
      <Route path={`${ROUTES.LENDING.path}`} element={<LandingPage />}></Route>
    </Switch>
  );
};

export default Routes;
