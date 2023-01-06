import { QueryKey, useQueries, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { fetchClaimableAmount } from '../../services';
import Web3 from 'web3';
import { QUERY_KEY } from '../../constants';
import { TransactionReceipt } from 'web3-core';

export const useClaimableAmount = (
  web3Instance: Web3 | null,
  tokenAddress: string,
  options?: UseQueryOptions<string, string, string, QueryKey>,
): UseQueryResult<string> => {
  const result = useQuery<string, string>(QUERY_KEY.ACCOUNT_BALANCE, fetchClaimableAmount(web3Instance, tokenAddress), {
    enabled: !!web3Instance && !!tokenAddress,
    ...options,
  });
  return result;
};
