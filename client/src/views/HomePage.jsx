import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../context/userContext";
import Nav from "../components/Nav";
import DisplayAll from "../components/DisplayAll";
import { getUserById } from "../services/LoginService";
import { Buffer } from "buffer";
import { exchangeCodeForAccessToken } from "../services/SpotifyAuthService";

const HomePage = (props) => {
    const [spotifyToken, setSpotifyToken] = useState("");
    const { user, setUser } = useContext(userContext);
    const id = window.localStorage.getItem("UUID");

    // get code and state values from the redirect url from Spotify. in the searchbar
    const code = new URLSearchParams(window.location.search).get("code");
    const state = new URLSearchParams(window.location.search).get("state");

    // Get user username information
    useEffect(() => {
        getUserById(id)
            .then((res) => {
                console.log(res);
                setUser(res);
            })
            .catch((err) => {
                setErrors(err);
            });

        console.log("is user existing? ", user === 0);
        // Get Spotify Access token and store it in local memory
        exchangeCodeForAccessToken(code, state);
    }, [code]);

    const searchHandler = async (e) => {
        console.log("search was triggered");
    };

    return (
        <div>
            <Nav loggedUser={user.username} />
            <h2 className="text-center mt-5 text-white">
                The Most Liked Playlists
            </h2>
            <DisplayAll />
            <button onClick={searchHandler}></button>
        </div>
    );
};

export default HomePage;
