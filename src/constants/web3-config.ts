import { AbiItem } from 'web3-utils';

export const MAX_APPROVE_AMOUNT = '115792089237316195423570985008687907853269984665640564039457584007913129639935';

export const COIN_CODE = 'RHO';
export const COIN_DECIMAL = 18;
export const COIN_TOTAL_SUPPLY = '100000000000000000000000000000000';
export const BLOCK_INTERVAL = 10000;
export const REWARD_INTERVAL = 10 * 1000;
export const TOTAL_REWARD_BLOCK = 10512000;
export const APR_PERCENTAGE = 0.05;

// LOCAL
// export const COIN_CHAIN_ID = 1337;
// export const TOKEN_CONTRACT = '0xC32348F7526FB2B832Dc968018010F4312392788';
// export const NFT_CONTRACT = '0xaba44BceCc4001f2649d4fAa5918BbE7AfA9fd25';

// DEV
export const COIN_CHAIN_ID = 97;
export const LP_CONTRACT = '0x22986b7e570d203778517143bb07d21f1e4ceb10';
export const STT_CONTRACT = '0x831F9b3e42f43B72c573F2ED987Bb1d60aE863CE';
export const USDT_BMT_CONTRACT = '0xcb6Cd7fFccbBa8e5A3900E72D35E2224104DCaC0';
export const TOKEN_CONTRACT = '0x99B634a03E42Ec2C730DB82045fa3937ED8b47B3';
export const NFT_CONTRACT = '0x6c96D71f87bd1E9e17D612c9907458048a252765';
export const BSC_SCAN_HOST = 'https://testnet.bscscan.com/';
export const BLOCK_TIMESTAMP = 1594324640;

// PROD
// export const COIN_CHAIN_ID = 56;
// export const TOKEN_CONTRACT = '0xabd29a5a984c97737707cc68d38c2903b8811061';
// export const NFT_CONTRACT = '';
// export const BSC_SCAN_HOST = 'https://bscscan.com/';
// export const BLOCK_TIMESTAMP = 1598671449;

export const TRAINING_INTERVAL = 60;
export const LAUNCHPAD_CONTRACT = '0xb225A7dDEc75e9bb1047F80d066851AF6fC54C79';
export const LAUNCHPAD_ABI: AbiItem[] = [
  {
    inputs: [{ internalType: 'uint256', name: '_projectIdSeed', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'projectId', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'tokenRemain', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'timestamp', type: 'uint256' },
    ],
    name: 'MasterWithdrawRemainToken',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'projectId', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'tokenAllocation', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fundTokenAmount', type: 'uint256' },
      { indexed: false, internalType: 'address', name: 'lockWallet', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'timestamp', type: 'uint256' },
    ],
    name: 'UserProcessPostPrivateSale',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'projectId', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'tokenAllocation', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fundTokenAmount', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fundTokenPayback', type: 'uint256' },
      { indexed: false, internalType: 'address', name: 'lockWallet', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'timestamp', type: 'uint256' },
    ],
    name: 'UserProcessPostPublicSale',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'projectId', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'tokenAllocation', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fundTokenAmount', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'timestamp', type: 'uint256' },
    ],
    name: 'UserProcessPrivateSale',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'projectId', type: 'uint256' },
      { indexed: false, internalType: 'uint8', name: 'currentUserStatus', type: 'uint8' },
      { indexed: false, internalType: 'uint256', name: 'tokenAllocation', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fundTokenAmount', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'timestamp', type: 'uint256' },
    ],
    name: 'UserProcessPublicSale',
    type: 'event',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'projectIdSeed',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'stakeTokenList',
    outputs: [{ internalType: 'address', name: 'smartChef', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'stakeValidationPeriod',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    name: 'userTransactions',
    outputs: [
      { internalType: 'uint256', name: 'projectId', type: 'uint256' },
      { internalType: 'address', name: 'lockWallet', type: 'address' },
      { internalType: 'uint256', name: 'tokenAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'depositAmount', type: 'uint256' },
      { internalType: 'bool', name: 'processed', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [{ internalType: 'uint256', name: 'newPeriod', type: 'uint256' }],
    name: 'setStakePeriod',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'projectType', type: 'uint256' },
      { internalType: 'address', name: 'master', type: 'address' },
      { internalType: 'address', name: 'fundToken', type: 'address' },
      { internalType: 'uint256[]', name: 'additionalParams', type: 'uint256[]' },
      { internalType: 'uint8', name: 'monthLock', type: 'uint8' },
      { internalType: 'uint16', name: 'preClaimRatio', type: 'uint16' },
    ],
    name: 'addProject',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'projectId', type: 'uint256' },
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'address', name: 'master', type: 'address' },
      { internalType: 'address', name: 'fundToken', type: 'address' },
      { internalType: 'uint256[]', name: 'additionalParams', type: 'uint256[]' },
      { internalType: 'uint8', name: 'monthLock', type: 'uint8' },
      { internalType: 'uint16', name: 'preClaimRatio', type: 'uint16' },
    ],
    name: 'updateProject',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'projectId', type: 'uint256' },
      { internalType: 'uint256[]', name: 'tokenAllocation', type: 'uint256[]' },
    ],
    name: 'updatePublicSaleTokenAllocation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'smartChef', type: 'address' },
      { internalType: 'uint256[]', name: 'lpAllocation', type: 'uint256[]' },
    ],
    name: 'updateStakeTokenRequirement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'smartChef', type: 'address' }],
    name: 'removeStakeTokenRequirement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'projectId', type: 'uint256' }],
    name: 'removeProject',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'projectId', type: 'uint256' },
      { internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'addWhitelist',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'projectId', type: 'uint256' },
      { internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'removeWhitelist',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'projectId', type: 'uint256' }],
    name: 'endProject',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'projectId', type: 'uint256' }],
    name: 'getProjectPrivateDetail',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'ID', type: 'uint256' },
          { internalType: 'address', name: 'token', type: 'address' },
          { internalType: 'address', name: 'master', type: 'address' },
          { internalType: 'address', name: 'fundToken', type: 'address' },
          { internalType: 'uint256', name: 'fundTokenRatio', type: 'uint256' },
          { internalType: 'uint256', name: 'tokenOnSale', type: 'uint256' },
          { internalType: 'uint256', name: 'minimumAllocation', type: 'uint256' },
          { internalType: 'uint256', name: 'maximumAllocation', type: 'uint256' },
          { internalType: 'uint256', name: 'saleTime', type: 'uint256' },
          { internalType: 'uint256', name: 'endTime', type: 'uint256' },
          { internalType: 'uint256', name: 'processTime', type: 'uint256' },
          { internalType: 'uint256', name: 'totalDeposit', type: 'uint256' },
          { internalType: 'uint256', name: 'tokenRemain', type: 'uint256' },
          { internalType: 'address[]', name: 'whitelists', type: 'address[]' },
        ],
        internalType: 'struct LaunchpadPrivateVM',
        name: 'projectVM',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [{ internalType: 'uint256', name: 'projectId', type: 'uint256' }],
    name: 'getProjectPublicDetail',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'ID', type: 'uint256' },
          { internalType: 'address', name: 'token', type: 'address' },
          { internalType: 'address', name: 'master', type: 'address' },
          { internalType: 'address', name: 'fundToken', type: 'address' },
          { internalType: 'uint256', name: 'fundTokenRatio', type: 'uint256' },
          { internalType: 'uint256', name: 'tokenOnSale', type: 'uint256' },
          { internalType: 'uint256', name: 'saleTime', type: 'uint256' },
          { internalType: 'uint256', name: 'endTime', type: 'uint256' },
          { internalType: 'uint256', name: 'processTime', type: 'uint256' },
          { internalType: 'uint256', name: 'totalDeposit', type: 'uint256' },
          { internalType: 'uint256[]', name: 'tokenAllocation', type: 'uint256[]' },
        ],
        internalType: 'struct LaunchpadPublicVM',
        name: 'projectVM',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getUserTransaction',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'projectId', type: 'uint256' },
          { internalType: 'address', name: 'lockWallet', type: 'address' },
          { internalType: 'uint256', name: 'tokenAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'depositAmount', type: 'uint256' },
          { internalType: 'bool', name: 'processed', type: 'bool' },
        ],
        internalType: 'struct TransactionHistory[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [{ internalType: 'uint256', name: 'projectId', type: 'uint256' }],
    name: 'getProjectTransaction',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'projectId', type: 'uint256' },
          { internalType: 'address', name: 'lockWallet', type: 'address' },
          { internalType: 'uint256', name: 'tokenAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'depositAmount', type: 'uint256' },
          { internalType: 'bool', name: 'processed', type: 'bool' },
        ],
        internalType: 'struct TransactionHistory',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'projectId', type: 'uint256' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'processPrivateSale',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'projectId', type: 'uint256' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'processPublicSale',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getUserStatus',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [{ internalType: 'uint256', name: 'projectId', type: 'uint256' }],
    name: 'processPostPrivateSale',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'projectId', type: 'uint256' }],
    name: 'processPostPublicSale',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'projectId', type: 'uint256' }],
    name: 'withdrawRemainingToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
export const TOKEN_ABI: AbiItem[] = [
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'guy', type: 'address' },
      { internalType: 'uint256', name: 'wad', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'deposit',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ internalType: 'uint256', name: 'wad', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
export const LOCK_WALLET_ABI: AbiItem[] = [
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'preClaimAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'claimedAmount', type: 'uint256' },
      { internalType: 'uint8', name: 'monthLock', type: 'uint8' },
      { internalType: 'uint256', name: 'startTime', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: '_time', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'Withdraw',
    type: 'event',
  },
  {
    inputs: [],
    name: '_amount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_claimedAmount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_monthLock',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_preClaimAmount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_startTime',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_token',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getInfo',
    outputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint8', name: '', type: 'uint8' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getClaimableAmount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  { inputs: [], name: 'claimToken', outputs: [], stateMutability: 'nonpayable', type: 'function' },
];
export const SMART_CHEF_ABI: AbiItem[] = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'Deposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'EmergencyWithdraw',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'token', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'TokenRecovery',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint256', name: 'poolLimitPerUser', type: 'uint256' }],
    name: 'UpdatePoolLimit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint256', name: 'rewardPerBlock', type: 'uint256' }],
    name: 'UpdateRewardPerBlock',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'startBlock', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'endBlock', type: 'uint256' },
    ],
    name: 'UpdateStartEndBlock',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'Withdraw',
    type: 'event',
  },
  {
    inputs: [],
    name: '_delegator',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'accTokenPerShare',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'endBlock',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'hasUserLimit',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isInitialized',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lastRewardBlock',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'poolLimitPerUser',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [],
    name: 'rewardPerBlock',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardToken',
    outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'stakedToken',
    outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'startBlock',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalDeposit',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'userInfo',
    outputs: [
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'rewardDebt', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: '_stakedToken', type: 'address' },
      { internalType: 'contract IERC20', name: '_rewardToken', type: 'address' },
      { internalType: 'uint256', name: '_rewardPerBlock', type: 'uint256' },
      { internalType: 'uint256', name: '_startBlock', type: 'uint256' },
      { internalType: 'uint256', name: '_endBlock', type: 'uint256' },
      { internalType: 'uint256', name: '_poolLimitPerUser', type: 'uint256' },
      { internalType: 'address', name: '_admin', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'getDepositHistory',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
        ],
        internalType: 'struct DepositHistory[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  { inputs: [], name: 'emergencyWithdraw', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [
      { internalType: 'address', name: '_tokenAddress', type: 'address' },
      { internalType: 'uint256', name: '_tokenAmount', type: 'uint256' },
    ],
    name: 'recoverWrongTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { inputs: [], name: 'stopReward', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [
      { internalType: 'bool', name: '_hasUserLimit', type: 'bool' },
      { internalType: 'uint256', name: '_poolLimitPerUser', type: 'uint256' },
    ],
    name: 'updatePoolLimitPerUser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_rewardPerBlock', type: 'uint256' }],
    name: 'updateRewardPerBlock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_startBlock', type: 'uint256' },
      { internalType: 'uint256', name: '_endBlock', type: 'uint256' },
    ],
    name: 'updateStartAndEndBlocks',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_user', type: 'address' }],
    name: 'pendingReward',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];
export const QUERY_KEY = {
  APPROVE_STATUS: 'approval_status',
  APPROVE_RECEIPT: 'approve_receipt',
  ACCOUNT: 'account',
  ACCOUNT_BALANCE: 'account_balance',
  USER_STATUS: 'user_status',
  USER_BALANCE: 'user_balance',
  PENDING_REWARD: 'pending_reward',
  STAKING_LIST: 'staking_list',
  STAKING_IDO: 'staking_ido',
  PROJECT_LIST: 'project_list',
  REQUEST_STAKE: 'request-stake',
  REQUEST_CLAIM_TOKEN: 'request-claim-token',
  REQUEST_UNSTAKE: 'request-unstake',
  USER_INFO: 'user-info',
  TOTAL_DEPOSIT: 'total-deposit',
  REWARD_PER_BLOCK: 'reward-per-block',
  USER_TRANSACTION: 'user-transaction',
  PROJECT_DETAIL: 'project-detail',
  PROJECT_TRANSACTION: 'project-transaction',
  REQUEST_PUBLIC_SALE: 'request-public-sale',
  REQUEST_POST_PUBLIC_SALE: 'request-post-public-sale',
  REQUEST_PROJECT_PUBLIC_DETAIL: 'project-public-detail',
};
