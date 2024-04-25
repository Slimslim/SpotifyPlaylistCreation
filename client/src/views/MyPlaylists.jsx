import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPlaylistById } from "../services/PlaylistService";
import Nav from "../components/Nav";
import DisplayUserPlaylists from "../components/DisplayUserPlaylists";

const MyPlaylists = (props) => {
    return (
        <div>
            <Nav />
            <h2 className="text-center mt-5">Your Playlists</h2>
            <DisplayUserPlaylists />
        </div>
    );
};

export default MyPlaylists;
