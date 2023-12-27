export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'createNFT' : IDL.Func([IDL.Text, IDL.Vec(IDL.Nat8)], [IDL.Principal], []),
  });
};
export const init = ({ IDL }) => { return []; };
