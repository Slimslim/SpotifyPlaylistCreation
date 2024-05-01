import React, { useState, useContext, useEffect } from "react";
import { userContext } from "../context/userContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    deletePlaylistById,
    getAllPlaylists,
} from "../services/PlaylistService";
import { msToHMS } from "../util/Utilities";
import { getUserById } from "../services/LoginService";

const DisplayUserPlaylists = (props) => {
    const { loggedUser } = props;
    const [playlists, setPlaylists] = useState([]);
    const navigate = useNavigate();
    const { user, setUser } = useContext(userContext);

    const id = window.localStorage.getItem("UUID");

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

    const deleteHandler = (playlistId) => {
        deletePlaylistById(playlistId)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

        setPlaylists(playlists.filter((track) => track._id != playlistId));
    };

    const editHandler = (playlistId) => {
        navigate(`/update/${playlistId}`);
    };

    return (
        <div className="fresh-table full-color-orange m-5">
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th className="text-center">Nb of tracks</th>
                        <th className="text-center">Playtime</th>
                        <th className="text-center">Created By</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {playlists.map((playlist) =>
                        playlist.createdBy === loggedUser ? (
                            <tr key={playlist._id}>
                                <td>
                                    {" "}
                                    <Link to={`/playlist/${playlist._id}`}>
                                        {playlist.name}
                                    </Link>
                                </td>
                                <td className="text-center">
                                    {playlist.trackList.length}
                                </td>
                                <td className="text-center">
                                    {msToHMS(playlist.totalPlaytime)}
                                </td>
                                <td className="text-center">
                                    {playlist.createdBy}
                                </td>
                                <td className="user_playlist_actions justify-content-center">
                                    <button
                                        onClick={() =>
                                            editHandler(playlist._id)
                                        }
                                        className="btn btn-light "
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            deleteHandler(playlist._id)
                                        }
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
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
