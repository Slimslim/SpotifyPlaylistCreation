import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Nav from "../components/Nav";
import DisplayPlaylist from "../components/DisplayPlaylist";

const PlaylistDetails = (props) => {
    const { id } = useParams();
    console.log("ID passed: ", id);

    return (
        <div>
            <Nav />
            <DisplayPlaylist playlistId={id} />
        </div>
    );
};

export default PlaylistDetails;
