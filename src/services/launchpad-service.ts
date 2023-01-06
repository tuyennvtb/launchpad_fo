/* eslint-disable no-async-promise-executor */
import Web3 from 'web3';
import { BACKEND_API_URL } from '../constants';
import {
  StakingListResponse,
  ProjectListResponse,
  ProjectDetailResponse,
  TransactionDetailResponse,
  StakingIDOResponse,
} from 'src/dto/launchpad-response';
import { TransactionReceipt } from 'web3-core';
import {
  TOKEN_ABI,
  TOKEN_CONTRACT,
  LAUNCHPAD_CONTRACT,
  MAX_APPROVE_AMOUNT,
  COIN_TOTAL_SUPPLY,
  LAUNCHPAD_ABI,
} from '../constants';

export const fetchStakingList = () => {
  return (): Promise<StakingListResponse[]> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${BACKEND_API_URL}/staking/list`);
        resolve(res.json());
      } catch (e: any) {
        reject(e.message);
      }
    });
  };
};

export const fetchProjectList = () => {
  return (): Promise<ProjectListResponse> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${BACKEND_API_URL}/project/list`);
        resolve(res.json());
      } catch (e: any) {
        reject(e.message);
      }
    });
  };
};

export const fetchProjectDetail = (projectId) => {
  return (): Promise<ProjectDetailResponse> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${BACKEND_API_URL}/project/detail?projectId=${projectId}`);
        resolve(res.json());
      } catch (e: any) {
        reject(e.message);
      }
    });
  };
};

export const fetchProjectTransaction = (web3Instance: Web3 | null, projectId: string | undefined) => {
  return (): Promise<TransactionDetailResponse> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      if (!web3Instance) {
        reject('Web3 is null');
        return;
      }
      try {
        const [address] = await web3Instance.eth.getAccounts();
        const launchpadContract = new web3Instance.eth.Contract(LAUNCHPAD_ABI, LAUNCHPAD_CONTRACT, { from: address });
        const transaction = await launchpadContract.methods.getProjectTransaction(projectId).call();
        resolve(transaction);
      } catch (e: any) {
        reject(e.message);
      }
    });
  };
};

export const fetchStakingIDO = () => {
  return (): Promise<StakingIDOResponse[]> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${BACKEND_API_URL}/staking/ido`);
        resolve(res.json());
      } catch (e: any) {
        reject(e.message);
      }
    });
  };
};

export const fetchUserTransactions = (web3Instance: Web3 | null) => {
  return (): Promise<any> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      if (!web3Instance) {
        reject('Web3 is null');
        return;
      }
      try {
        const [address] = await web3Instance.eth.getAccounts();
        const launchpadContract = new web3Instance.eth.Contract(LAUNCHPAD_ABI, LAUNCHPAD_CONTRACT, { from: address });
        const transaction = await launchpadContract.methods.getUserTransaction(address).call();
        resolve(transaction);
      } catch (e: any) {
        reject(e.message);
      }
    });
  };
};

export const fetchProjectPublicDetail = (web3Instance: Web3 | null, projectId: string | undefined) => {
  return (): Promise<any> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      if (!web3Instance) {
        reject('Web3 is null');
        return;
      }
      try {
        const [address] = await web3Instance.eth.getAccounts();
        const launchpadContract = new web3Instance.eth.Contract(LAUNCHPAD_ABI, LAUNCHPAD_CONTRACT, { from: address });
        const transaction = await launchpadContract.methods.getProjectPublicDetail(projectId).call();
        resolve(transaction);
      } catch (e: any) {
        reject(e.message);
      }
    });
  };
};

export const processPublicSale = (web3Instance: Web3 | null, projectId: string, amount: string) => {
  return (): Promise<TransactionReceipt> => {
    return new Promise<any>(async (resolve, reject) => {
      if (!web3Instance) {
        reject('Web3 is null');
        return;
      }
      try {
        console.log('processPublicSale');
        const [address] = await web3Instance.eth.getAccounts();
        const launchpadContract = new web3Instance.eth.Contract(LAUNCHPAD_ABI, LAUNCHPAD_CONTRACT, { from: address });
        const tx = await launchpadContract.methods.processPublicSale(projectId, amount).send();
        const receipt = await web3Instance.eth.getTransactionReceipt(tx.transactionHash);
        resolve(receipt);
      } catch (e: any) {
        reject(e.message);
      }
    });
  };
};

export const processPostPublicSale = (web3Instance: Web3 | null, projectId: string | undefined) => {
  return (): Promise<TransactionReceipt> => {
    return new Promise<TransactionReceipt>(async (resolve, reject) => {
      console.log('processPostPublicSale', projectId);
      if (!web3Instance) {
        reject('Web3 is null');
        return;
      }
      try {
        const [address] = await web3Instance.eth.getAccounts();
        const tokenContract = new web3Instance.eth.Contract(LAUNCHPAD_ABI, LAUNCHPAD_CONTRACT, { from: address });
        const tx = await tokenContract.methods.processPostPublicSale(projectId).send();
        const receipt = await web3Instance.eth.getTransactionReceipt(tx.transactionHash);
        resolve(receipt);
      } catch (e: any) {
        reject(e.message);
      }
    });
  };
};
