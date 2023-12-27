import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import homeImage from "../../assets/home-img.png";
import Item from "./Item";
import Minter from "./Minter";
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Gallery from "./Gallery";
import CURRENT_USER_ID from "../index";
import { Principal } from '@dfinity/principal';
import { opend } from "../../../declarations/opend/index";

function Header() {
    const [userNftIDs, setUserNftIDs] = useState();
    const [listingNftIDs, setlistingNftIDs] = useState();

    async function getNFTIds() {
        const userIDs = await opend.getOwnedNFTs(CURRENT_USER_ID);
        const listingIDs = await opend.listingNFTs();

        console.log(listingIDs);

        setUserNftIDs((<Gallery title="My NFT's" nftIDs={userIDs} role="collection"/>));
        setlistingNftIDs((<Gallery title="Discover" nftIDs={listingIDs} role="discover"/>));
      }
    
      useEffect(() => {
        getNFTIds();
      }, []);


    return (
        <BrowserRouter forceRefresh={true}>
            <div className="app-root-1">
                <header className="Paper-root AppBar-root AppBar-positionStatic AppBar-colorPrimary Paper-elevation4">
                    <div className="Toolbar-root Toolbar-regular header-appBar-13 Toolbar-gutters">
                        
                        <div class-Name="header-left-4"></div>
                        <img className="header-logo-11" src={logo} />
                        <div className="header-vertical-9"></div>

                        <Link to="/">
                            <h5 className="Typography-root header-logo-text">OpenD</h5>
                        </Link>

                        <div className="header-empty-6"></div>
                        <div className="header-space-8"></div>

                        <Link to="/discover">
                            <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
                                Discover
                            </button>
                        </Link>

                        <Link to="/minter">
                            <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
                                Minter
                            </button>
                        </Link>

                        <Link to="/collection">
                            <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
                                My NFTs
                            </button>
                        </Link>

                    </div>
                </header>
            </div>

            <Switch>
                <Route exact path="/">
                <img className="bottom-space" src={homeImage} />
                </Route>
                <Route path="/discover">
                    {listingNftIDs}
                </Route>
                <Route path="/minter">
                    <Minter />
                </Route>
                <Route path="/collection">
                    {userNftIDs}
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Header;
