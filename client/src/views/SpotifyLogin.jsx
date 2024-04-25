import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { logout } from "../services/LoginService";
import { userContext } from "../context/userContext";
import { requestAuthorization } from "../services/SpotifyService";

// import Nav from "../components/Nav";
// import DisplayAll from "../components/DisplayAll";

const SpotifyLogin = (props) => {
    const { user, setUser } = useContext(userContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [spotifycode, setSpotifyCode] = useState("");

    return (
        <div>
            <Nav />
            <div className="d-flex justify-content-center">
                <div className="d-flex-column text-center">
                    <h1>Hello {user.username}</h1>
                    <p>Please, log into your Spotify account</p>
                </div>
            </div>
            <div>
                <button
                    className="button-88"
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
        </div>
    );
};

export default SpotifyLogin;
