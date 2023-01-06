/* eslint-disable no-async-promise-executor */
import Web3 from 'web3';
import { SMART_CHEF_ABI } from '../constants';

export const fetchPendingReward = (web3Instance: Web3 | null, smartChef) => {
  return (): Promise<string> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      if (!web3Instance) {
        reject('Web3 is null');
        return;
      }
      try {
        const [address] = await web3Instance.eth.getAccounts();
        const smartChefContract = new web3Instance.eth.Contract(SMART_CHEF_ABI, smartChef, { from: address });
        const userStatus = await smartChefContract.methods.pendingReward(address).call();
        resolve(userStatus);
      } catch (e: any) {
        reject(e.message);
      }
    });
  };
};

export const fetchUserInfo = (web3Instance: Web3 | null, smartChef) => {
  return (): Promise<string> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      if (!web3Instance) {
        reject('Web3 is null');
        return;
      }
      try {
        const [address] = await web3Instance.eth.getAccounts();
        const smartChefContract = new web3Instance.eth.Contract(SMART_CHEF_ABI, smartChef, { from: address });
        const userInfo = await smartChefContract.methods.userInfo(address).call();
        resolve(userInfo);
      } catch (e: any) {
        reject(e.message);
      }
    });
  };
};

export const fetchTotalDeposit = (web3Instance: Web3 | null, smartChef) => {
  return (): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      if (!web3Instance) {
        reject('Web3 is null');
        return;
      }
      try {
        const [address] = await web3Instance.eth.getAccounts();
        const tokenContract = new web3Instance.eth.Contract(SMART_CHEF_ABI, smartChef, { from: address });
        const balance = await tokenContract.methods.totalDeposit().call();
        resolve(balance);
      } catch (e: any) {
        reject(e.message);
      }
    });
  };
};

export const fetchRewardPerBlock = (web3Instance: Web3 | null, smartChef) => {
  return (): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      if (!web3Instance) {
        reject('Web3 is null');
        return;
      }
      try {
        const [address] = await web3Instance.eth.getAccounts();
        const tokenContract = new web3Instance.eth.Contract(SMART_CHEF_ABI, smartChef, { from: address });
        const balance = await tokenContract.methods.rewardPerBlock().call();
        resolve(balance);
      } catch (e: any) {
        reject(e.message);
      }
    });
  };
};

export const requestWithdraw = (web3Instance: Web3 | null, smartChef: string, amount) => {
  return (): Promise<string> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      if (!web3Instance) {
        reject('Web3 is null');
        return;
      }
      try {
        const [address] = await web3Instance.eth.getAccounts();
        const smartChefContract = new web3Instance.eth.Contract(SMART_CHEF_ABI, smartChef, { from: address });
        const result = await smartChefContract.methods.withdraw(amount).send();

        resolve(result);
      } catch (e: any) {
        reject(e.message);
      }
    });
  };
};

export const requestDeposit = (web3Instance: Web3 | null, smartChef, amount) => {
  return (): Promise<string> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      if (!web3Instance) {
        reject('Web3 is null');
        return;
      }
      try {
        const [address] = await web3Instance.eth.getAccounts();
        const smartChefContract = new web3Instance.eth.Contract(SMART_CHEF_ABI, smartChef, { from: address });
        const result = await smartChefContract.methods.deposit(amount).send();
        resolve(result);
      } catch (e: any) {
        reject(e.message);
      }
    });
  };
};
