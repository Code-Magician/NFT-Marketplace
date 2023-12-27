import Debug "mo:base/Debug";
import Principal "mo:base/Principal";

actor class NFT(name : Text, owner : Principal, content : [Nat8]) = this {
    private var nftName : Text = name;
    private var nftOwner : Principal = owner;
    private var imageBytes = content;

    public query func getName() : async Text {
        return nftName;
    };

    public query func getOwner() : async Principal {
        return nftOwner;
    };

    public query func getNFT() : async [Nat8] {
        return imageBytes;
    };

    public query func getCanisterId() : async Principal {
        return Principal.fromActor(this);
    };

    public shared (msg) func transferOwnerShip(newOwner : Principal) : async Text {
        if (Principal.equal(nftOwner, msg.caller)) {
            if (Principal.equal(msg.caller, newOwner)) {
                return "You are already the owner of this NFT.";
            } else {
                nftOwner := newOwner;
                return "Success";
            };
        } else {
            return "You don't own the NFT.";
        };
    };
};
