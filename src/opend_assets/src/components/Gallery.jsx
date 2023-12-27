import React, { useEffect, useState } from "react";
import Item from "./Item";
import { Principal } from '@dfinity/principal';

function Gallery(props) {
    // const nftCanisterId = "rrkah-fqaaa-aaaaa-aaaaq-cai";
    const [items, setItems] = useState();

    function fetchIDs() {
        if(props.nftIDs != undefined)
        {
            setItems((props.nftIDs.map((id, idx) => {
                return (<Item key={idx} id={id} role={props.role} />)
            })))
        }
    }

    useEffect(() => {
        fetchIDs();
    }, []);

    return (
        <div className="gallery-view">
            <h3 className="makeStyles-title-99 Typography-h3">{props.title}</h3>
            <div className="disGrid-root disGrid-container disGrid-spacing-xs-2">
                <div className="disGrid-root disGrid-item disGrid-grid-xs-12">
                    <div className="disGrid-root disGrid-container disGrid-spacing-xs-5 disGrid-justify-content-xs-center">
                        {items}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Gallery;
