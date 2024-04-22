import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPlaylistById } from "../services/PlaylistService";
import { msToHMS } from "../util/Utilities";

const DisplayPlaylist = (props) => {
    const { playlistId } = props;
    const [playlist, setPlaylist] = useState([]);

    console.log("Playlist ID: ", playlistId);

    useEffect(() => {
        console.log("Searching playlist by ID");
        getPlaylistById(playlistId)
            .then((res) => {
                console.log(res);
                setPlaylist(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="fresh-table full-color-orange m-5">
            <table id="fresh-table" className="table">
                {/* <table className="table border-2 border-dark"> */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Album</th>
                        <th>Duration</th>
                        <th>BPM</th>
                    </tr>
                </thead>
                <tbody>
                    {playlist.trackList.map((track) => (
                        <tr key={track._id}>
                            <td>#</td>
                            <td>
                                <div>{track.name}</div>
                                <div>{track.artist}</div>
                            </td>
                            <td>
                                <div>{track.album}</div>
                            </td>
                            <td className="text-center">
                                {msToHMS(track.duration)}
                            </td>
                            <td>{track.bpm}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link className="btn btn-light border border-dark">
                Create a Playlist
            </Link>
        </div>
    );
};

export default DisplayPlaylist;
