import type { Principal } from '@dfinity/principal';
export interface NFT {
  'getNFT' : () => Promise<Array<number>>,
  'getName' : () => Promise<string>,
  'getOwner' : () => Promise<Principal>,
}
export interface _SERVICE extends NFT {}
