import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../context/userContext";
import { useParams, Link } from "react-router-dom";
import Nav from "../components/Nav";
import DisplayPlaylist from "../components/DisplayPlaylist";
import { getUserById } from "../services/LoginService";

const PlaylistDetails = (props) => {
    const { user, setUser } = useContext(userContext);
    const userId = window.localStorage.getItem("UUID");
    const { id } = useParams();
    console.log("ID passed: ", id);

    useEffect(() => {
        getUserById(userId)
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
            <DisplayPlaylist playlistId={id} />
        </div>
    );
};

export default PlaylistDetails;
