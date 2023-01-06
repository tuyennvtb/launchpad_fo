import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import { toBN, toWei } from 'web3-utils';

declare global {
  interface Window {
    ethereum: any;
  }
}

export const getWeb3 = () =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise<Web3>(async (resolve, reject) => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    }
  });

export const getWeiUnit = (decimal: number) => {
  switch (decimal) {
    case 1:
      return 'wei';
    case 3:
      return 'kwei';
    case 6:
      return 'mwei';
    case 9:
      return 'gwei';
    case 12:
      return 'micro';
    case 15:
      return 'milli';
    case 18:
      return 'ether';
    case 21:
      return 'kether';
    case 24:
      return 'mether';
    case 27:
      return 'gether';
    case 30:
      return 'tether';
  }
};

export const getAmountIn = (amount, decimals) => {
  const calculatedAmount = amount ? amount : '0';
  const unit = getWeiUnit(decimals);

  const amountInNumber = new BigNumber(calculatedAmount).toFixed(decimals);
  console.log('amountInNumber', amountInNumber);
  const amountIn: any = toBN(toWei(amountInNumber, unit));
  return amountIn;
};
