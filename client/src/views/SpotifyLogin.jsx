import axios from "axios";
import { Buffer } from "buffer";

import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { logout } from "../services/LoginService";

import { userContext } from "../context/userContext";
import {
    fetchAccessToken,
    requestAuthorization,
    spotifyRedirectHandler,
} from "../services/SpotifyService";

// import Nav from "../components/Nav";
// import DisplayAll from "../components/DisplayAll";

const SpotifyLogin = (props) => {
    const { user, setUser } = useContext(userContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [spotifycode, setSpotifyCode] = useState("");

    // useEffect(() => {
    //     if (window.location.hash.search) {
    //         const { code, state } = spotifyRedirectHandler(
    //             window.location.search
    //         );
    //         setSpotifyCode(code);
    //         console.log({ code });

    /// Skipping this step for now. getting token directly
    // axios
    //     .post("https://accounts.spotify.com/api/token", {
    //         method: "POST",
    //         form: {
    //             code: code,
    //             redirect_uri: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    //             grant_type: "authorization_code",
    //         },
    //         headers: {
    //             "content-type": "application/x-www-form-urlencoded",
    //             Authorization:
    //                 "Basic " +
    //                 Buffer.from(
    //                     import.meta.env.VITE_SPOTIFY_CLIENT_ID +
    //                         ":" +
    //                         import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
    //                 ).toString("base64"),
    //         },
    //         json: true,
    //     })
    //     .then((response) => {
    //         console.log(response);
    //     });
    //     }
    // }, []);

    // const spotifyLoginHandler = () => {
    //     fetchAccessToken(spotifycode);
    // };

    // const logoutHandler = () => {
    //     logout()
    //         .then((res) => {
    //             console.log(res);
    //             navigate("/");
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             setErrors(err);
    //         });
    // };

    return (
        <div>
            <Nav username={user.username} />
            <div className="d-flex justify-content-center">
                <div className="d-flex-column text-center">
                    <h1>Hello {user.username}</h1>
                    <p>Please, log into your Spotify account</p>
                </div>
            </div>
            <div>
                <button
                    className="btn btn-light border border-dark"
                    onClick={() => {
                        requestAuthorization();
                    }}
                >
                    {/* On click request auth */}
                    <img
                        className="SpotifyIcon"
                        src="./assets/SpotifyLogo/Spotify_Icon_RGB_Black.png"
                        alt=""
                    />
                    <p>connect to Spotify</p>
                </button>
            </div>
            {/* <button onClick={() => logoutHandler()}>Logout</button> */}
            {/* <Nav title= {"Store Finder"}/>
            <DisplayAll/> */}
        </div>
    );
};

export default SpotifyLogin;
