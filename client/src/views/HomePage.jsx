import React, { useState, useEffect } from "react";
import {
    fetchAccessToken,
    spotifyRedirectHandler,
} from "../services/SpotifyService";
import { getArtist } from "../services/SpotifyAPIService";
import Nav from "../components/Nav";
import DisplayAll from "../components/DisplayAll";

const HomePage = (props) => {
    const [spotifyToken, setSpotifyToken] = useState("");

    // useEffect(() => {
    //     console.log("URL in Home page: ", window.location.search);

    //     if (window.location.hash.search) {
    //         const { code, state } = spotifyRedirectHandler(
    //             window.location.search
    //         );
    //         // setSpotifyCode(code);
    //         console.log({ code });
    //         fetchAccessToken(code);
    //     }

    //     if (window.location.hash) {
    //         console.log("URL in Home page: ", window.location.search);
    //         const { access_token, token_type, expires_in, state } =
    //             spotifyRedirectHandler(window.location.hash);

    //         // access_token.cookie("spotifToken", access_token);

    //         localStorage.setItem("SpotifyAccessToken", access_token);
    //         localStorage.setItem("SpotifyTokenType", token_type);

    //         if (localStorage.getItem("SpotifyAccessToken")) {
    //             setSpotifyToken(localStorage.getItem("SpotifyAccessToken"));
    //         }

    //         console.log({ access_token });
    //     }
    // }, []);

    const searchHandler = async (e) => {
        console.log("search was triggered");

        getArtist(spotifyToken);
    };

    return (
        <div>
            <Nav />
            <h2 className="text-center mt-5">The Most Liked Playlists</h2>
            <DisplayAll />
        </div>
    );
};

export default HomePage;
