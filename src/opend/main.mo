import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import NFTActorClass "../NFT/nft";
import Cycles "mo:base/ExperimentalCycles";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Text "mo:base/Text";
import Bool "mo:base/Bool";
import Iter "mo:base/Iter";

actor OpenD {
    private type Listing = {
        owner: Principal;
        price: Nat;
    };

    let nftMap = HashMap.HashMap<Principal, NFTActorClass.NFT>(1, Principal.equal, Principal.hash);
    let ownersMap = HashMap.HashMap<Principal, List.List<Principal>>(1, Principal.equal, Principal.hash);
    let listedNftsMap = HashMap.HashMap<Principal, Listing>(1, Principal.equal, Principal.hash);


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
    };

    public query func listingNFTs () : async [Principal] {
        return Iter.toArray(listedNftsMap.keys());
    };

    public shared(msg) func listNft(id: Principal, itemPrice: Nat): async Text {
        let listedNft: NFTActorClass.NFT = switch(nftMap.get(id)) {
            case null return "NFT does not exist.";
            case (?res) res;
        }; 

        let itemOwner = await listedNft.getOwner();
        if(Principal.equal(itemOwner, msg.caller)){
            let item: Listing = {
                owner = itemOwner;
                price = itemPrice;
            };

            listedNftsMap.put(id, item);
            return "Success";
        }
        else {
            return "Yout don't own the NFT.";
        }
    };

    public query func getOpendCanisterId(): async Principal {
        return Principal.fromActor(OpenD);
    };

    public query func isListed(id: Principal): async Bool {
        if(listedNftsMap.get(id) == null) return false;
        
        return true;
    };

    public query func getNftOriginalOwner(id: Principal): async Principal {
        let item: Listing = switch(listedNftsMap.get(id)) {
            case null return Principal.fromText("");
            case (?res) res;
        };

        return item.owner;
    };

    public query func getNftPrice(id: Principal): async Nat {
        let item: Listing = switch(listedNftsMap.get(id)) {
            case null return 0;
            case (?res) res;
        };

        return item.price;
    };
};
