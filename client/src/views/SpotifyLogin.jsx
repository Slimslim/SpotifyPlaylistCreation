import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { logout } from "../services/LoginService";
import { userContext } from "../context/userContext";
import { requestAuthorization } from "../services/SpotifyAuthService";

// import Nav from "../components/Nav";
// import DisplayAll from "../components/DisplayAll";

const SpotifyLogin = (props) => {
    const { user, setUser } = useContext(userContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [spotifycode, setSpotifyCode] = useState("");

    return (
        <div className="spotify_login_page_background">
            <Nav />
            <div className="login_container">
                <div className="login_text">
                    <h1 className="login_username">{user.username}</h1>
                </div>
                <div className="login_button">
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
        </div>
    );
};

export default SpotifyLogin;
