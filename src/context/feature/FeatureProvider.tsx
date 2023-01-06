import * as React from 'react';
import FeatureContext, { FeatureContextProps } from './feature';
import { FlagsProvider } from 'flagged';
import { ENABLE_FIGHTING, ENABLE_MARKET } from 'src/constants/game-config';

export const FeatureProvider: React.FC = ({ children }) => {
  const [feature, setFeature] = React.useState<FeatureContextProps>({
    rhinoEnable: true,
    marketEnable: true,
    fightingEnable: true,
  });

  const handleSetFeature = React.useCallback(
    (newFeature: FeatureContextProps) => {
      setFeature({
        ...feature,
        ...newFeature,
      });
    },
    [feature],
  );

  React.useEffect(() => {
    const enableFighting = localStorage.getItem(ENABLE_FIGHTING);
    if (enableFighting === '1' && !feature.fightingEnable) {
      handleSetFeature({
        fightingEnable: true,
      });
    }
  }, [feature, handleSetFeature]);

  React.useEffect(() => {
    const enableMarket = localStorage.getItem(ENABLE_MARKET);
    if (enableMarket === '1' && !feature.marketEnable) {
      handleSetFeature({
        marketEnable: true,
      });
    }
  }, [feature, handleSetFeature]);

  return (
    <FeatureContext.Provider
      value={{
        ...feature,
        setFeature: handleSetFeature,
      }}
    >
      <FlagsProvider
        features={{
          rhinoEnable: feature.rhinoEnable || false,
          marketEnable: feature.marketEnable || false,
          fightingEnable: feature.fightingEnable || false,
        }}
      >
        {children}
      </FlagsProvider>
    </FeatureContext.Provider>
  );
};

export default FeatureProvider;
