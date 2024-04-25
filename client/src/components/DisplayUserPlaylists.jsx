import React, { useState, useContext, useEffect } from "react";
import { userContext } from "../context/userContext";
import { Link, useParams } from "react-router-dom";
import { getAllPlaylists } from "../services/PlaylistService";
import { msToHMS } from "../util/Utilities";
import { getUserById } from "../services/LoginService";

const DisplayUserPlaylists = (props) => {
    const [playlists, setPlaylists] = useState([]);
    const { user, setUser } = useContext(userContext);

    const id = window.localStorage.getItem("UUID");

    useEffect(() => {
        getUserById(id)
            .then((res) => {
                setUser(res.username);
            })
            .catch((err) => {
                setErrors(err);
            });
    }, []);

    useEffect(() => {
        console.log("Searching playlists");
        getAllPlaylists()
            .then((res) => {
                console.log(res);
                setPlaylists(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="fresh-table full-color-orange m-5">
            <table id="fresh-table" className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Nb of tracks</th>
                        <th>Playtime</th>
                        <th>Created By</th>
                        <th>Likes</th>
                    </tr>
                </thead>
                <tbody>
                    {playlists.map((playlist) =>
                        playlist.createdBy === user ? (
                            <tr key={playlist._id}>
                                <td>
                                    {" "}
                                    <Link to={`/playlist/${playlist._id}`}>
                                        {playlist.name}
                                    </Link>
                                </td>
                                <td>{playlist.trackList.length}</td>
                                <td className="text-center">
                                    {msToHMS(playlist.totalPlaytime)}
                                </td>
                                <td>{playlist.createdBy}</td>
                                <td>{playlist.likes}</td>
                            </tr>
                        ) : null
                    )}
                </tbody>
            </table>
            <Link className="btn btn-light border border-dark" to={"/create"}>
                Create a Playlist
            </Link>
        </div>
    );
};

export default DisplayUserPlaylists;
