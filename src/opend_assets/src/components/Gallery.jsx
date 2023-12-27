import React, { useEffect, useState } from "react";
import Item from "./Item";
import { opend } from "../../../declarations/opend/index";
import CURRENT_USER_ID from "../index";
import { Principal } from '@dfinity/principal';

function Gallery(props) {
  // const nftCanisterId = "rrkah-fqaaa-aaaaa-aaaaq-cai";
  const [nftIds, setNftIds] = useState();

  async function getNFTIds() {
    const userNFTIds = await opend.getOwnedNFTs(CURRENT_USER_ID);
    setNftIds(userNFTIds);
  }

  useEffect(() => {
    getNFTIds();
  }, []);

  return (
    <div className="gallery-view">
      <h3 className="makeStyles-title-99 Typography-h3">{props.title}</h3>
      <div className="disGrid-root disGrid-container disGrid-spacing-xs-2">
        <div className="disGrid-root disGrid-item disGrid-grid-xs-12">
          <div className="disGrid-root disGrid-container disGrid-spacing-xs-5 disGrid-justify-content-xs-center">
            {nftIds && nftIds.map((nftId, idx) => {
              return (<Item key={idx} id={nftId} />)
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
