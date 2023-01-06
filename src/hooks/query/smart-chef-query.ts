import { QueryKey, useQueries, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import {
  fetchPendingReward,
  requestDeposit,
  requestWithdraw,
  fetchUserInfo,
  fetchTotalDeposit,
  fetchRewardPerBlock,
} from '../../services';
import Web3 from 'web3';
import { QUERY_KEY } from '../../constants';

export const usePendingRewardQuery = (
  web3Instance: Web3 | null,
  contractAddress: String,
  options?: UseQueryOptions<string, string, string, QueryKey>,
): UseQueryResult<string> => {
  const result = useQuery<string, string>(
    [QUERY_KEY.PENDING_REWARD, contractAddress],
    fetchPendingReward(web3Instance, contractAddress),
    {
      enabled: !!web3Instance,
      ...options,
    },
  );
  return result;
};

export const useUserInfoQuery = (
  web3Instance: Web3 | null,
  contractAddress: String,
  options?: UseQueryOptions<string, string, string, QueryKey>,
): UseQueryResult<string> => {
  const result = useQuery<string, string>(
    [QUERY_KEY.USER_INFO, contractAddress],
    fetchUserInfo(web3Instance, contractAddress),
    {
      enabled: !!web3Instance,
      ...options,
    },
  );
  return result;
};

export const useTotalDeposit = (
  web3Instance: Web3 | null,
  contractAddress: String,
  options?: UseQueryOptions<string, string, string, QueryKey>,
): UseQueryResult<string> => {
  const result = useQuery<string, string>(
    [QUERY_KEY.TOTAL_DEPOSIT, contractAddress],
    fetchTotalDeposit(web3Instance, contractAddress),
    {
      enabled: !!web3Instance,
      ...options,
    },
  );
  return result;
};

export const useRewardPerBlock = (
  web3Instance: Web3 | null,
  contractAddress: String,
  options?: UseQueryOptions<string, string, string, QueryKey>,
): UseQueryResult<string> => {
  const result = useQuery<string, string>(
    [QUERY_KEY.REWARD_PER_BLOCK, contractAddress],
    fetchRewardPerBlock(web3Instance, contractAddress),
    {
      enabled: !!web3Instance,
      ...options,
    },
  );
  return result;
};

export const useRequestStake = (
  web3Instance: Web3 | null,
  smartChefContract: String,
  amount: number,
  options?: UseQueryOptions<string, string, string, QueryKey>,
): UseQueryResult<string> => {
  const result = useQuery<string, string>(
    [QUERY_KEY.REQUEST_STAKE, smartChefContract],
    requestDeposit(web3Instance, smartChefContract, amount),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      retry: false,
      ...options,
    },
  );
  return result;
};

export const useRequestUnstake = (
  web3Instance: Web3 | null,
  smartChefContract: string,
  amount: number,
  options?: UseQueryOptions<string, string, string, QueryKey>,
): UseQueryResult<string> => {
  const result = useQuery<string, string>(
    [QUERY_KEY.REQUEST_UNSTAKE, smartChefContract],
    requestWithdraw(web3Instance, smartChefContract, amount),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      retry: false,
      ...options,
    },
  );
  return result;
};

export const useRequestClaimToken = (
  web3Instance: Web3 | null,
  smartChefContract: string,
  amount: number,
  options?: UseQueryOptions<string, string, string, QueryKey>,
): UseQueryResult<string> => {
  const result = useQuery<string, string>(
    [QUERY_KEY.REQUEST_CLAIM_TOKEN, smartChefContract],
    requestWithdraw(web3Instance, smartChefContract, amount),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      retry: false,
      ...options,
    },
  );
  return result;
};
