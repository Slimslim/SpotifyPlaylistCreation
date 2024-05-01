import React, { useState, useContext, useEffect } from "react";
import { userContext } from "../context/userContext";
import { Link, useParams } from "react-router-dom";
import { getPlaylistById } from "../services/PlaylistService";
import { msToHMS } from "../util/Utilities";
import { getUserById } from "../services/LoginService";

import littlePhatty from "../assets/webAudioSwitch/LittlePhatty.png";
import redButton from "../assets/webAudioSwitch/redbutton128.png";
import greenButton from "../assets/webAudioSwitch/green_button.png";

import {
    WebAudioSwitch,
    WebAudioKnob,
    WebAudioParam,
} from "webaudio-controls-react-typescript";

const DisplayPlaylist = (props) => {
    const { playlistId } = props;
    const [playlist, setPlaylist] = useState({});
    const { user, setUser } = useContext(userContext);
    const id = window.localStorage.getItem("UUID");

    console.log("Playlist ID: ", playlistId);

    useEffect(() => {
        console.log("Searching playlist by ID");
        getPlaylistById(playlistId)
            .then((res) => {
                // console.log(res);
                setPlaylist(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="tracklist_width">
            <div className="playlist_info_container">
                <div className="playlist_title_container">
                    <p className="playlist_title_label">Playlist title</p>
                    <div className="title_tape">
                        <input
                            className="title_field shantell-sans-handfont"
                            value={playlist?.name}
                            type="text"
                            disabled
                        />
                    </div>
                </div>

                <div className="playlist_action_container">
                    <button
                        className="create_button"
                        // onClick={() => createPlaylistHandler()}
                    ></button>
                    <label className="action_labels text-center">
                        ADD TO SPOTIFY
                    </label>
                </div>
                <div className="playlist_info_data">
                    <div className="track_counter">
                        <label>#</label>
                        <div className="track_count_display">
                            <p className="track_count_number">
                                {/* {playlist?.trackList.length} */}
                            </p>
                        </div>

                        {/* <Display height={20} value={2} /> */}
                    </div>
                </div>
            </div>
            <div></div>
            {playlist.trackList &&
                playlist.trackList.map((track) => (
                    <div key={track.trackSpotifyId} className="track_div">
                        <div className="track_data">
                            <div className="album_cover">
                                {/* {console.log(track.album.images[0].url)} */}
                                <img
                                    className="cover_image"
                                    src={track.cover}
                                    alt=""
                                />
                            </div>
                            <div className="track_information">
                                <p className="track_name">{track.name}</p>
                                <p className="artists_div">{track.artist}</p>
                            </div>
                            <div className="extra_data">
                                <div className="track_features_left_values">
                                    <div className="audio_feature">
                                        <p className="action_labels">INSTRU.</p>
                                        <WebAudioParam
                                            value={Math.round(
                                                track.instrumentalness * 10
                                            )}
                                        />
                                    </div>
                                    <div className="audio_feature">
                                        <p className="action_labels">DANCE.</p>
                                        <WebAudioParam
                                            value={Math.round(
                                                track.danceability * 10
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="track_features_right_values">
                                    <div className="audio_feature">
                                        <p className="action_labels">ENERGY</p>
                                        <WebAudioParam
                                            outline={"white"}
                                            value={Math.round(
                                                track.energy * 10
                                            )}
                                        />
                                    </div>
                                    <div className="audio_feature">
                                        <p className="action_labels">Tempo</p>
                                        <WebAudioParam
                                            value={Math.round(track.tempo)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="track_actions">
                            {/* {track.preview_url ? (
                                            <audio
                                                className="audio_player"
                                                controls
                                                src={track.preview_url}
                                            ></audio>
                                        ) : null} */}
                            <label
                                className="action_labels"
                                // onClick={() =>
                                //     removeFromPlaylistHandler(
                                //         track.trackSpotifyId
                                //     )
                                // }
                            >
                                REMOVE
                            </label>

                            <WebAudioSwitch
                                width={50}
                                height={20}
                                src={greenButton}
                                type="kick"
                                enable={0}
                            />

                            <label className="action_labels">PREVIEW</label>
                            <WebAudioSwitch
                                width={50}
                                height={20}
                                src={greenButton}
                                type="kick"
                                enable={0}
                            />
                            <label className="action_labels">SEED</label>
                            <WebAudioSwitch
                                width={50}
                                height={20}
                                src={greenButton}
                                type="kick"
                                enable={0}
                                // onSwitchClick={() =>
                                //     seedSpotifyHandler(track.trackSpotifyId)
                                // }
                            />
                            {/* <button
                                    onClick={() =>
                                        removeFromPlaylistHandler(
                                            track.trackSpotifyId
                                        )
                                    }
                                    className=" add_button bi bi-dash"
                                    type="button"
                                ></button> */}
                        </div>
                        {/* // track.id // track.album.images[1] //
                                        track.name // track.artists[] // */}
                    </div>
                ))}
            {/* <Link className="btn btn-light border border-dark">
                Create a Playlist
            </Link> */}
        </div>
    );
};

export default DisplayPlaylist;
