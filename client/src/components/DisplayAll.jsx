import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../context/userContext";
import { Link } from "react-router-dom";
import { getAllPlaylists } from "../services/PlaylistService";
import { msToHMS } from "../util/Utilities";

const DisplayAll = (props) => {
    const [playlists, setPlaylists] = useState([]);
    const { user, setUser } = useContext(userContext);
    // const [updated, setUpdated] = useState(false);

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

    // const deleteHandler = (storeId) => {
    //     console.log("delete triggered");
    //     console.log(storeId);

    //     deleteStoreById(storeId)
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });

    //     setUpdated(true);

    //     //add a filter to update state
    // };

    return (
        <div className="fresh-table full-color-orange m-5">
            <table id="fresh-table" className="table">
                {/* <table className="table border-2 border-dark"> */}
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
                    {playlists.map((playlist) => (
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
                    ))}
                </tbody>
            </table>
            <Link className="btn btn-light border border-dark" to={"/create"}>
                Create a Playlist
            </Link>
        </div>
    );
};

export default DisplayAll;
