import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'freeTokens' : () => Promise<string>,
  'getBalance' : (arg_0: Principal) => Promise<bigint>,
  'getSymbol' : () => Promise<string>,
  'transfer' : (arg_0: Principal, arg_1: bigint) => Promise<string>,
}
