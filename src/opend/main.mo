import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import NFTActorClass "../NFT/nft";
import Cycles "mo:base/ExperimentalCycles";
import HashMap "mo:base/HashMap";
import List "mo:base/List";

actor OpenD {
    let nftMap = HashMap.HashMap<Principal, NFTActorClass.NFT>(1, Principal.equal, Principal.hash);
    let ownersMap = HashMap.HashMap<Principal, List.List<Principal>>(1, Principal.equal, Principal.hash);


    public shared(msg) func createNFT(name: Text, content: [Nat8]): async Principal {
        let owner: Principal = msg.caller;

        Debug.print(debug_show(Cycles.balance()));
        Cycles.add(100_500_000_000);
        Debug.print(debug_show(Cycles.balance()));

        let newNFT = await NFTActorClass.NFT(name, owner, content);
        let nftCanisterId = await newNFT.getCanisterId();

        nftMap.put(nftCanisterId, newNFT);
        addToOwnersList(owner, nftCanisterId);

        return nftCanisterId;
    };

    public func addToOwnersList(owner: Principal, nftCanisterId: Principal) {
        var nftList: List.List<Principal> = switch(ownersMap.get(owner)) {
            case null List.nil<Principal>();
            case (?res) res;
        };

        nftList := List.push(nftCanisterId, nftList);
        ownersMap.put(owner, nftList);
    };

    public query func getOwnedNFTs ( owner: Principal ) : async [Principal] {
        let nftList: List.List<Principal> = switch(ownersMap.get(owner)) {
            case null List.nil<Principal>();
            case (?res) res;
        };

        return List.toArray<Principal>(nftList);
    }
};
