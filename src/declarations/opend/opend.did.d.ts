import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'addToOwnersList' : (arg_0: Principal, arg_1: Principal) => Promise<
      undefined
    >,
  'createNFT' : (arg_0: string, arg_1: Array<number>) => Promise<Principal>,
  'getOpendCanisterId' : () => Promise<Principal>,
  'getOwnedNFTs' : (arg_0: Principal) => Promise<Array<Principal>>,
  'listNft' : (arg_0: Principal, arg_1: bigint) => Promise<string>,
}
