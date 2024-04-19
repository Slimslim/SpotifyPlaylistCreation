import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { logout } from "../services/LoginService";
// import Nav from "../components/Nav";
// import DisplayAll from "../components/DisplayAll";

const SpotifyLogin = (props) => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const logoutHandler = () => {
        logout()
            .then((res) => {
                console.log(res);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
                setErrors(err);
            });
    };

    return (
        <div>
            <Nav />
            <h1>Spotify Login page</h1>
            {/* <button onClick={() => logoutHandler()}>Logout</button> */}
            {/* <Nav title= {"Store Finder"}/>
            <DisplayAll/> */}
        </div>
    );
};

export default SpotifyLogin;
