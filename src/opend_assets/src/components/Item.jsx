import React, { useEffect, useState } from "react";
import { idlFactory } from "../../../declarations/nft";
import { Actor, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";

function Item(props) {
	const [name, setName] = useState();
	const [owner, setOwner] = useState();
	const [image, setImage] = useState();

	async function loadNFT() {
		const id = props.id;
		const localhost = "http://localhost:8080/";
		const agent = new HttpAgent({host: localhost});

		const NFTActor = await Actor.createActor(idlFactory, {
			agent,
			canisterId: id
		});

		const nftName = await NFTActor.getName();
		const nftOwner = await NFTActor.getOwner();

		const imageData = await NFTActor.getNFT();
		const imageContent = new Uint8Array(imageData);
		const imageURL = URL.createObjectURL(
			new Blob([imageContent.buffer]), 
			{type: "image/png"}
		);

		setName(nftName);
		setOwner(nftOwner.toText());
		setImage(imageURL);
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
				</div>
			</div>
		</div>
	);
}

export default Item;
