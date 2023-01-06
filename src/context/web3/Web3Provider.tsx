import * as React from 'react';
import Web3 from 'web3';
import Web3Context from './web3';
import { getWeb3 } from 'src/utils/web3';
import { COIN_CHAIN_ID } from 'src/constants';
import { QueryClient, useQueryClient } from 'react-query';

const handleSetWeb3 = async (
  setWeb3: React.Dispatch<React.SetStateAction<Web3 | null>>,
  setChainId: React.Dispatch<React.SetStateAction<number>>,
  setAccount: React.Dispatch<React.SetStateAction<string>>,
  queryClient: QueryClient,
) => {
  try {
    const web3Instance = await getWeb3();
    const chainId = await web3Instance.eth.getChainId();
    const [address] = await web3Instance.eth.getAccounts();
    setChainId(chainId);
    setAccount(address);
    if (chainId === COIN_CHAIN_ID) {
      setWeb3(web3Instance);
    } else {
      setWeb3(null);
    }
  } catch (error) {
    setWeb3(null);
  }
};

export const Web3Provider: React.FC = ({ children }) => {
  const [web3, setWeb3] = React.useState<Web3 | null>(null);
  const [chainId, setChainId] = React.useState<number>(-1);
  const [account, setAccount] = React.useState<string>('');

  const queryClient = useQueryClient();

  const handleChainChanged = React.useCallback(() => {
    window.location.reload();
  }, []);

  const handleOnAccountChanged = React.useCallback((accounts) => {
    window.location.reload();
  }, []);

  const handleWindowLoaded = React.useCallback(() => {
    const { ethereum } = window as any;
    if (ethereum.selectedAddress) {
      handleSetWeb3(setWeb3, setChainId, setAccount, queryClient);
    }
  }, [queryClient]);

  React.useEffect(() => {
    const { ethereum } = window as any;
    if (!ethereum) {
      return;
    }

    ethereum.on('chainChanged', handleChainChanged);
    ethereum.on('accountsChanged', handleOnAccountChanged);
    window.addEventListener('load', handleWindowLoaded);

    return () => {
      if (ethereum.removeListener) {
        ethereum.removeListener('chainChanged', handleChainChanged);
        ethereum.removeListener('accountsChanged', handleOnAccountChanged);
        ethereum.removeListener('load', handleWindowLoaded);
      }
    };
  }, [handleChainChanged, handleOnAccountChanged, handleWindowLoaded]);

  const requestWeb3 = React.useCallback(() => {
    handleSetWeb3(setWeb3, setChainId, setAccount, queryClient);
  }, [queryClient]);

  return (
    <Web3Context.Provider
      value={{
        web3,
        requestWeb3,
        chainId,
        account,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
