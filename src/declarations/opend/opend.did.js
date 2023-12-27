export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'addToOwnersList' : IDL.Func(
        [IDL.Principal, IDL.Principal],
        [],
        ['oneway'],
      ),
    'createNFT' : IDL.Func([IDL.Text, IDL.Vec(IDL.Nat8)], [IDL.Principal], []),
    'getOpendCanisterId' : IDL.Func([], [IDL.Principal], ['query']),
    'getOwnedNFTs' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(IDL.Principal)],
        ['query'],
      ),
    'isListed' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    'listNft' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
