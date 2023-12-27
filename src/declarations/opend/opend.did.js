export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'addToOwnersList' : IDL.Func(
        [IDL.Principal, IDL.Principal],
        [],
        ['oneway'],
      ),
    'createNFT' : IDL.Func([IDL.Text, IDL.Vec(IDL.Nat8)], [IDL.Principal], []),
    'getOwnedNFTs' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(IDL.Principal)],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
