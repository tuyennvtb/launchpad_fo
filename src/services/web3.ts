/* eslint-disable no-async-promise-executor */
import Web3 from 'web3';
import {
  TOKEN_ABI,
  TOKEN_CONTRACT,
  LAUNCHPAD_CONTRACT,
  MAX_APPROVE_AMOUNT,
  COIN_TOTAL_SUPPLY,
  LAUNCHPAD_ABI,
} from '../constants';
import { TransactionReceipt } from 'web3-core';

export const fetchAccountBalance = (web3Instance: Web3 | null, tokenAddress: string, queryAddress?: string) => {
  return (): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      if (!web3Instance) {
        reject('Web3 is null');
        return;
      }
      try {
        const [address] = await web3Instance.eth.getAccounts();
        const finalAddress = queryAddress ? queryAddress : address;
        const tokenContract = new web3Instance.eth.Contract(TOKEN_ABI, tokenAddress, { from: address });
        const balance = await tokenContract.methods.balanceOf(finalAddress).call();
        resolve(balance);
      } catch (e: any) {
        reject(e.message);
      }
    });
  };
};

export const fetchAccount = (web3Instance: Web3 | null) => {
  return (): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      if (!web3Instance) {
        reject('Web3 is null');
        return;
      }
      try {
        const [address] = await web3Instance.eth.getAccounts();
        resolve(address);
      } catch (e: any) {
        reject(e.message);
      }
    });
  };
};

export const fetchApprovalStatusQuery = (web3Instance: Web3 | null, tokenAddress: string, spender: string) => {
  return (): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      if (!web3Instance) {
        reject('Web3 is null');
        return;
      }
      try {
        const { toBN } = web3Instance.utils;
        const [address] = await web3Instance.eth.getAccounts();
        const tokenContract = new web3Instance.eth.Contract(TOKEN_ABI, tokenAddress, { from: address });
        const allowance = await tokenContract.methods.allowance(address, spender).call();
        if (toBN(allowance).gt(toBN(COIN_TOTAL_SUPPLY))) {
          return resolve(true);
        }
        resolve(false);
      } catch (e: any) {
        reject(e.message);
      }
    });
  };
};

export const requestApproval = (web3Instance: Web3 | null, tokenAddress: string, spender: string) => {
  return (): Promise<TransactionReceipt> => {
    return new Promise<TransactionReceipt>(async (resolve, reject) => {
      if (!web3Instance) {
        reject('Web3 is null');
        return;
      }
      try {
        const [address] = await web3Instance.eth.getAccounts();
        const tokenContract = new web3Instance.eth.Contract(TOKEN_ABI, tokenAddress, { from: address });
        const tx = await tokenContract.methods.approve(spender, MAX_APPROVE_AMOUNT).send();
        const receipt = await web3Instance.eth.getTransactionReceipt(tx.transactionHash);
        resolve(receipt);
      } catch (e: any) {
        reject(e.message);
      }
    });
  };
};

export const fetchUserStatus = (web3Instance: Web3 | null) => {
  return (): Promise<string> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      if (!web3Instance) {
        reject('Web3 is null');
        return;
      }
      try {
        const [address] = await web3Instance.eth.getAccounts();
        const launchpadContract = new web3Instance.eth.Contract(LAUNCHPAD_ABI, LAUNCHPAD_CONTRACT, { from: address });
        const userStatus = await launchpadContract.methods.getUserStatus(address).call();
        resolve(userStatus);
      } catch (e: any) {
        reject(e.message);
      }
    });
  };
};
