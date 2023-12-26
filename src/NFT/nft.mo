import Debug "mo:base/Debug";
import Principal "mo:base/Principal";


actor class NFT (name: Text, owner: Principal, content: [Nat8]) {
    let nftName = name;
    let nftOwner = owner;
    let imageBytes = content;

    public query func getName(): async Text {
        return nftName;
    };

    public query func getOwner(): async Principal {
        return nftOwner;
    };

    public query func getNFT(): async [Nat8] {
        return imageBytes;
    }
}