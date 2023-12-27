import React, { useEffect, useState } from "react";
import { idlFactory } from "../../../declarations/nft";
import { idlFactory as tokenIdlFactory } from "../../../declarations/token";
import { Actor, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import Button from './Button';
import { opend } from "../../../declarations/opend/index";
import Loader from "./Loader";
import CURRENT_USER_ID from "../index";
import PriceLabel from "./PriceLabel";

function Item(props) {
    const [name, setName] = useState();
    const [owner, setOwner] = useState();
    const [image, setImage] = useState();
    const [button, setButton] = useState();
    const [priceInput, setPriceInput] = useState();
    const [loaderHidden, setLoaderHidden] = useState(true);
    const [blur, setBlur] = useState({});
    const [listedTxt, setListedTxt] = useState("");
    const [priceLabel, setPrice] = useState();
    const [shouldDisplay, setShouldDisplay] = useState(true);

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
        setImage(imageURL);

        const isListed = await opend.isListed(props.id);

        if (props.role == "collection") {
            setOwner(isListed ? "OpenD" : nftOwner.toText());
            setButton(isListed ? null : (<Button onClick={handleSell} title="Sell" />));
            setBlur(isListed ? { filter: "blur(4px)" } : {});
            setListedTxt(isListed ? "Listed" : "");
        }
        else if (props.role == "discover") {
            const originalOwner = await opend.getNftOriginalOwner(props.id);
            const nftPrice = await opend.getNftPrice(props.id);

            setOwner(originalOwner.toText());
            setPrice((<PriceLabel sellPrice={nftPrice.toString()}/>));

            if(originalOwner.toText() != CURRENT_USER_ID.toText()) {
                setButton((<Button onClick={handleBuy} title="Buy" />));
            }
        }
    }

    async function handleBuy() {
        setLoaderHidden(false);
        setButton();

        const tokenActor = await Actor.createActor(tokenIdlFactory, {
            agent,
            canisterId: Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai")
        });

        const sellerId = await opend.getNftOriginalOwner(props.id);
        const nftPrice = await opend.getNftPrice(props.id);

        const result = await tokenActor.transfer(sellerId, nftPrice);
        if(result == "Success")
        {
            const changeOwnerResult = await opend.completePurchase(props.id, sellerId, CURRENT_USER_ID);
            console.log("Purchase " + changeOwnerResult);
        }

        setLoaderHidden(true);
        setShouldDisplay(false);
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
        setBlur({ filter: "blur(4px)" });
        setLoaderHidden(false);
        setPriceInput(null);
        setButton(null);

        let listingResult = await opend.listNft(props.id, Number(price));
        console.log(listingResult);

        if (listingResult === "Success") {
            const opendID = await opend.getOpendCanisterId();
            let transferOwnerResult = await NFTActor.transferOwnerShip(opendID);
            console.log(transferOwnerResult);

            if (transferOwnerResult === "Success") {
                setLoaderHidden(true);
                setOwner("OpenD");
                setListedTxt("Listed");
            }
        }
    }

    useEffect(() => {
        loadNFT();
    }, [])

    return (
        <div className="disGrid-item" style={{display: shouldDisplay ? "inline": "none"}}>
            <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
                <img
                    className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
                    src={image}
                    style={blur}
                />
                <div className="disCardContent-root">
                    {priceLabel}
                    <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
                        {name} <span className="purple-text">{listedTxt}</span>
                    </h2>
                    <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
                        Owner: {owner}
                    </p>
                    <Loader hidden={loaderHidden} />
                    {priceInput}
                    {button}
                </div>
            </div>
        </div>
    );
}

export default Item;
