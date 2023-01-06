import * as React from 'react';

export type FeatureContextProps = {
  rhinoEnable?: boolean;
  fightingEnable?: boolean;
  marketEnable?: boolean;
  setFeature?: (feature: FeatureContextProps) => void;
};

const initialState: FeatureContextProps = {
  rhinoEnable: true,
  fightingEnable: true,
  marketEnable: true,
};

export default React.createContext(initialState);
