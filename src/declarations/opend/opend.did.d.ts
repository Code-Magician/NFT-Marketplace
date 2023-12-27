import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'addToOwnersList' : (arg_0: Principal, arg_1: Principal) => Promise<
      undefined
    >,
  'createNFT' : (arg_0: string, arg_1: Array<number>) => Promise<Principal>,
  'getNftOriginalOwner' : (arg_0: Principal) => Promise<Principal>,
  'getNftPrice' : (arg_0: Principal) => Promise<bigint>,
  'getOpendCanisterId' : () => Promise<Principal>,
  'getOwnedNFTs' : (arg_0: Principal) => Promise<Array<Principal>>,
  'isListed' : (arg_0: Principal) => Promise<boolean>,
  'listNft' : (arg_0: Principal, arg_1: bigint) => Promise<string>,
  'listingNFTs' : () => Promise<Array<Principal>>,
}
