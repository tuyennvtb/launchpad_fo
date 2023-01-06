import Web3 from 'web3';
import { QueryKey, useQueries, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { TransactionReceipt } from 'web3-core';
import {
  fetchStakingList,
  fetchProjectList,
  fetchProjectDetail,
  fetchProjectTransaction,
  processPublicSale,
  processPostPublicSale,
  fetchProjectPublicDetail,
  fetchStakingIDO,
  fetchUserTransactions,
} from '../../services';
import {
  StakingListResponse,
  ProjectListResponse,
  ProjectDetailResponse,
  TransactionDetailResponse,
  StakingIDOResponse,
} from 'src/dto/launchpad-response';
import { QUERY_KEY } from '../../constants';

export const useStakingList = (): UseQueryResult<StakingListResponse[]> => {
  const result = useQuery<StakingListResponse[], string>(QUERY_KEY.STAKING_LIST, fetchStakingList(), {
    enabled: true,
  });
  return result;
};

export const useStakingIDO = (): UseQueryResult<StakingIDOResponse[]> => {
  const result = useQuery<StakingIDOResponse[], string>(QUERY_KEY.STAKING_IDO, fetchStakingIDO(), {
    enabled: true,
  });
  return result;
};

export const useProjectListQuery = (): UseQueryResult<ProjectListResponse> => {
  const result = useQuery<ProjectListResponse, string>(QUERY_KEY.PROJECT_LIST, fetchProjectList(), {
    enabled: true,
  });
  return result;
};

export const useUserTransaction = (
  web3Instance: Web3 | null,
  options?: UseQueryOptions<string, string, string, QueryKey>,
): UseQueryResult<any> => {
  const result = useQuery<any, string>(QUERY_KEY.USER_TRANSACTION, fetchUserTransactions(web3Instance), {
    enabled: !!web3Instance,
    ...options,
  });
  return result;
};

export const useProjectDetailQuery = (projectId: string | undefined): UseQueryResult<ProjectDetailResponse> => {
  const result = useQuery<ProjectDetailResponse, string>(
    [QUERY_KEY.PROJECT_DETAIL, projectId],
    fetchProjectDetail(projectId),
    {
      enabled: true,
    },
  );
  return result;
};

export const useProcessPublicSale = (
  web3Instance: Web3 | null,
  projectId: string,
  amount: string,
  options?: UseQueryOptions<string, string, string, QueryKey>,
): UseQueryResult<any> => {
  const result = useQuery<any, string>(
    QUERY_KEY.REQUEST_PUBLIC_SALE,
    processPublicSale(web3Instance, projectId, amount),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      retry: false,
      ...options,
    },
  );
  return result;
};

export const useProjectPublicDetail = (
  web3Instance: Web3 | null,
  projectId: string | undefined,
  options?: UseQueryOptions<string, string, string, QueryKey>,
): UseQueryResult<any> => {
  const result = useQuery<any, string>(
    QUERY_KEY.REQUEST_PROJECT_PUBLIC_DETAIL,
    fetchProjectPublicDetail(web3Instance, projectId),
    {
      enabled: !!web3Instance,
      ...options,
    },
  );
  return result;
};

export const useProcessPostPublicSale = (
  web3Instance: Web3 | null,
  projectId: string | undefined,
  options?: UseQueryOptions<string, string, string, QueryKey>,
): UseQueryResult<TransactionReceipt> => {
  const result = useQuery<any, string>(
    QUERY_KEY.REQUEST_POST_PUBLIC_SALE,
    processPostPublicSale(web3Instance, projectId),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      retry: false,
      ...options,
    },
  );
  return result;
};

export const useProjectTransactionQuery = (
  web3Instance: Web3 | null,
  projectId: string | undefined,
  options?: UseQueryOptions<string, string, string, QueryKey>,
): UseQueryResult<any> => {
  const result = useQuery<any, string>(
    [QUERY_KEY.PROJECT_TRANSACTION, projectId],
    fetchProjectTransaction(web3Instance, projectId),
    {
      enabled: !!web3Instance,
      ...options,
    },
  );
  return result;
};
