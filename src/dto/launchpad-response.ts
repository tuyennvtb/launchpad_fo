export interface StakingListResponse {
  id: number;
  end_block: string;
  pool_limit_per_user: string;
  reward_token: string;
  reward_token_symbol: string;
  smart_chef_contract: string;
  stake_token: string;
  stake_token_symbol: string;
  start_block: string;
  updated_at: string;
  with_ido: number;
}

export interface StakingIDOResponse {
  id: number;
  end_block: string;
  pool_limit_per_user: string;
  reward_token: string;
  reward_token_symbol: string;
  smart_chef_contract: string;
  stake_token: string;
  stake_token_symbol: string;
  start_block: string;
  updated_at: string;
  with_ido: number;
  allocations: Array<string>;
}

export interface ProjectListData {
  id: string;
  created_date: string;
  description: string;
  end_time: string;
  fund_token_address: string;
  fund_token_ratio: string;
  fund_token_symbol: string;
  master_address: string;
  maximum_allocation: string;
  minimum_allocation: string;
  month_lock: number;
  name: string;
  preclaim_ratio: number;
  project_type: number;
  sale_time: string;
  token_address: string;
  token_on_sale: string;
  token_symbol: string;
}

export interface ProjectDetailResponse {
  id: string;
  created_date: string;
  description: string;
  end_time: string;
  fund_token_address: string;
  fund_token_ratio: string;
  fund_token_symbol: string;
  master_address: string;
  maximum_allocation: string;
  minimum_allocation: string;
  month_lock: number;
  name: string;
  preclaim_ratio: number;
  project_type: number;
  sale_time: string;
  token_address: string;
  token_on_sale: string;
  token_symbol: string;
}

export interface ListResponseMetadata {
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProjectListResponse {
  data: ProjectListData[];
  metadata: ListResponseMetadata;
}

export interface TransactionDetailResponse {
  projectId: string;
  lockWallet: string;
  tokenAmount: string;
  depositAmount: string;
  processed: boolean;
}
