/* eslint-disable no-async-promise-executor */
import Web3 from 'web3';
import { LOCK_WALLET_ABI } from '../constants';
import { TransactionReceipt } from 'web3-core';

export const fetchClaimableAmount = (web3Instance: Web3 | null, tokenAddress: string) => {
  return (): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      if (!web3Instance) {
        reject('Web3 is null');
        return;
      }
      try {
        const [address] = await web3Instance.eth.getAccounts();
        const lockWalletContract = new web3Instance.eth.Contract(LOCK_WALLET_ABI, tokenAddress, { from: address });
        const claimableAmount = await lockWalletContract.methods.getClaimableAmount().call();
        resolve(claimableAmount);
      } catch (e: any) {
        reject(e.message);
      }
    });
  };
};
