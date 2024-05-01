import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../context/userContext";
import { getUserById } from "../services/LoginService";

import { Link, useParams } from "react-router-dom";
import { getPlaylistById } from "../services/PlaylistService";
import Nav from "../components/Nav";
import DisplayUserPlaylists from "../components/DisplayUserPlaylists";

const MyPlaylists = (props) => {
    const { user, setUser } = useContext(userContext);
    const id = window.localStorage.getItem("UUID");

    useEffect(() => {
        getUserById(id)
            .then((res) => {
                console.log(res);
                setUser(res);
            })
            .catch((err) => {
                setErrors(err);
            });
    }, []);

    return (
        <div>
            <Nav loggedUser={user.username} />
            <h2 className="text-center mt-5 text-white">Your Playlists</h2>
            <DisplayUserPlaylists loggedUser={user.username} />
        </div>
    );
};

export default MyPlaylists;
