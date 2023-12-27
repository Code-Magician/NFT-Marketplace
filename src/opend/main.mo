import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import NFTActorClass "../NFT/nft";
import Cycles "mo:base/ExperimentalCycles";

actor OpenD {
    public shared(msg) func createNFT(name: Text, content: [Nat8]): async Principal {
        let owner: Principal = msg.caller;

        Debug.print(debug_show(Cycles.balance()));
        Cycles.add(100_500_000_000);
        Debug.print(debug_show(Cycles.balance()));

        let newNFT = await NFTActorClass.NFT(name, owner, content);
        let nftCanisterId = await newNFT.getCanisterId();

        return nftCanisterId;
    }
};
