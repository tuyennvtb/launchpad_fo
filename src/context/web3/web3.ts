import * as React from 'react';
import Web3 from 'web3';

type Web3Context = {
  web3: Web3 | null;
  requestWeb3: () => void;
  chainId: number;
  account: string;
};

const initialState: Web3Context = {
  web3: null,
  requestWeb3: () => {
    return;
  },
  chainId: -1,
  account: '',
};

export default React.createContext(initialState);
