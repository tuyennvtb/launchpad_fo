import { QueryKey, useQueries, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import {
  fetchAccountBalance,
  fetchAccount,
  requestApproval,
  fetchApprovalStatusQuery,
  fetchUserStatus,
} from '../../services';
import Web3 from 'web3';
import { QUERY_KEY } from '../../constants';
import { TransactionReceipt } from 'web3-core';

export const useAccountBalanceQuery = (
  web3Instance: Web3 | null,
  tokenAddress: string,
  queryAddress?: string,
  options?: UseQueryOptions<string, string, string, QueryKey>,
): UseQueryResult<string> => {
  const result = useQuery<string, string>(
    [QUERY_KEY.ACCOUNT_BALANCE, tokenAddress, queryAddress],
    fetchAccountBalance(web3Instance, tokenAddress, queryAddress),
    {
      enabled: !!web3Instance,
      ...options,
    },
  );
  return result;
};

export const useAccountQuery = (web3Instance: Web3 | null): UseQueryResult<string> => {
  const result = useQuery<string>(QUERY_KEY.ACCOUNT, fetchAccount(web3Instance), {
    refetchOnWindowFocus: false,
    enabled: !!web3Instance,
  });
  return result;
};

export const useApprovalStatusQuery = (
  web3Instance: Web3 | null,
  tokenAddress: string,
  spender: string,
): UseQueryResult<boolean> => {
  const result = useQuery<boolean>(
    [QUERY_KEY.APPROVE_STATUS, tokenAddress, spender],
    fetchApprovalStatusQuery(web3Instance, tokenAddress, spender),
    {
      refetchOnWindowFocus: false,
      enabled: !!web3Instance,
    },
  );
  return result;
};

export const useRequestApproval = (
  web3Instance: Web3 | null,
  tokenAddress: string,
  spender: string,
  options: UseQueryOptions<TransactionReceipt, string, TransactionReceipt, QueryKey>,
): UseQueryResult<TransactionReceipt> => {
  const result = useQuery<TransactionReceipt, string>(
    QUERY_KEY.APPROVE_RECEIPT,
    requestApproval(web3Instance, tokenAddress, spender),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      retry: false,
      ...options,
    },
  );
  return result;
};

export const useUserStatusQuery = (
  web3Instance: Web3 | null,
  options?: UseQueryOptions<string, string, string, QueryKey>,
): UseQueryResult<string> => {
  const result = useQuery<string, string>(QUERY_KEY.USER_STATUS, fetchUserStatus(web3Instance), {
    enabled: !!web3Instance,
    ...options,
  });
  return result;
};
