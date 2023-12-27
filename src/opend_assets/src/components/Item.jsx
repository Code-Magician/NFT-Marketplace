import React, { useEffect, useState } from "react";
import { idlFactory } from "../../../declarations/nft";
import { Actor, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import Button from './Button';
import { opend } from "../../../declarations/opend/index";

function Item(props) {
    const [name, setName] = useState();
    const [owner, setOwner] = useState();
    const [image, setImage] = useState();
    const [button, setButton] = useState();
    const [priceInput, setPriceInput] = useState();

    const id = props.id;
    const localhost = "http://localhost:8080/";
    const agent = new HttpAgent({ host: localhost });
    // Remove the below line When Deploying the project live.
    agent.fetchRootKey();
    let NFTActor;

    async function loadNFT() {
        NFTActor = await Actor.createActor(idlFactory, {
            agent,
            canisterId: id
        });

        const nftName = await NFTActor.getName();
        const nftOwner = await NFTActor.getOwner();

        const imageData = await NFTActor.getNFT();
        const imageContent = new Uint8Array(imageData);
        const imageURL = URL.createObjectURL(
            new Blob([imageContent.buffer]),
            { type: "image/png" }
        );

        setName(nftName);
        setOwner(nftOwner.toText());
        setImage(imageURL);
        setButton((<Button onClick={handleSell} title="Sell" />));
    }

    let price;
    function handleSell() {
        setPriceInput((<input
            placeholder="Price in DANG"
            type="number"
            className="price-input"
            value={price}
            onChange={e => price = e.target.value}
        />))
        setButton((<Button onClick={sellItem} title="Confirm" />));
    }

    async function sellItem() {
        setPriceInput(null);
        setButton(null);

        let listingResult = await opend.listNft(props.id, Number(price));
        console.log(listingResult);

        if(listingResult === "Success"){
            const opendID = await opend.getOpendCanisterId();
            let transferOwnerResult = await NFTActor.transferOwnerShip(opendID);
            console.log(transferOwnerResult);
        }  
    }

    useEffect(() => {
        loadNFT();
    }, [])

    return (
        <div className="disGrid-item">
            <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
                <img
                    className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
                    src={image}
                />
                <div className="disCardContent-root">
                    <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
                        {name}<span className="purple-text"></span>
                    </h2>
                    <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
                        Owner: {owner}
                    </p>
                    {priceInput}
                    {button}
                </div>
            </div>
        </div>
    );
}

export default Item;
