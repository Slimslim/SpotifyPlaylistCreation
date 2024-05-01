import React, { useState, useContext, useEffect } from "react";
import { userContext } from "../context/userContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createPlaylist, getPlaylistById } from "../services/PlaylistService";
import { getUserById } from "../services/LoginService";
import Nav from "../components/Nav";

import {
    getTracks,
    getArtistTopTracks,
    getAlbumTracks,
    getRecommendation,
} from "../services/SpotifyAPIService";
import searchBackgroundPanel from "../assets/images/BlackBackgroundPanel.jpg";
import littlePhatty from "../assets/webAudioSwitch/LittlePhatty.png";
import redButton from "../assets/webAudioSwitch/redbutton128.png";
import greenButton from "../assets/webAudioSwitch/green_button.png";
import { Display } from "react-7-segment-display";
import {
    WebAudioSwitch,
    WebAudioKnob,
    WebAudioParam,
} from "webaudio-controls-react-typescript";

const CreatePlaylist = (props) => {
    const navigate = useNavigate();

    const { user, setUser } = useContext(userContext);
    const [errors, setErrors] = useState({});
    const [spotifyTrackList, setSpotifyTrackList] = useState([]);
    const [trackSearch, setTrackSearch] = useState("");
    const [searchType, setSearchType] = useState("artist");
    const [dance, setDance] = useState(0.5);
    const [energy, setEnergy] = useState(0.5);
    const [instru, setInstru] = useState(0.5);
    const [tempo, setTempo] = useState(150);

    // const [recommendationData, setRecommendationData] = useState({});

    // List of the tracks to be displayed ==> Date pulled from track ids
    const [newPlaylist, setNewPlaylist] = useState({
        name: "",
        createdBy: "slimslim",
        likes: 0,
        privacySetting: "public",
        totalPlaytime: 1,
        trackList: [],
    });
    const [newTracklist, setNewTracklist] = useState([]);

    const id = window.localStorage.getItem("UUID");

    useEffect(() => {
        console.log("user information is: ", user);
        getUserById(id)
            .then((res) => {
                setUser(res);
                console.log(res);
                setNewPlaylist({ ...newPlaylist, createdBy: res.username });
            })
            .catch((err) => {
                setErrors(err);
            });

        // setNewPlaylist({ ...newPlaylist, createdBy: user.username });
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();

        if (searchType === "track") {
            // Query Spotify API to get track from search value
            getTracks(trackSearch, searchType)
                .then((res) => {
                    // console.log("response: ", res.tracks.items);
                    setSpotifyTrackList(res);
                })
                .catch((err) => {
                    console.log(err);
                    setErrors(err);
                });
        } else if (searchType === "artist") {
            getArtistTopTracks(trackSearch)
                .then((res) => {
                    // console.log("response: ", res.tracks.items);
                    setSpotifyTrackList(res);
                })
                .catch((err) => {
                    console.log(err);
                    setErrors(err);
                });
        } else if (searchType === "album") {
            getAlbumTracks(trackSearch)
                .then((res) => {
                    // console.log("response: ", res.tracks.items);
                    setSpotifyTrackList(res);
                })
                .catch((err) => {
                    console.log(err);
                    setErrors(err);
                });
        } else if (searchType === "recommendation") {
            getRecommendation(trackSearch, dance, energy, instru, tempo)
                .then((res) => {
                    // console.log("response: ", res.tracks.items);
                    setSpotifyTrackList(res);
                })
                .catch((err) => {
                    console.log(err);
                    setErrors(err);
                });
        } else {
            console.log("Recommendation function does not exist yet");
        }
    };

    const addToPlaylistHandler = (track) => {
        // Need to handle duplicates and not add if it is already in the list
        console.log("Adding song to playlist. ID: ", track);

        if (
            /// newTracklist is not used anymore!!!
            !newPlaylist.trackList.find(
                (playlist_track) => playlist_track.trackSpotifyId === track.id
            )
        ) {
            let artistString = "";
            for (let i = 0; i < track.artists.length; i++) {
                i === 0
                    ? (artistString += track.artists[i].name)
                    : (artistString += ", " + track.artists[i].name);
            }

            const arr = [
                ...newPlaylist.trackList,
                {
                    name: track.name,
                    artist: artistString,
                    tempo: track.audio_features.tempo,
                    danceability: track.audio_features.danceability,
                    energy: track.audio_features.energy,
                    instrumentalness: track.audio_features.instrumentalness,
                    duration: track.duration_ms,
                    trackSpotifyId: track.id,
                    preview_url: track.preview_url,
                    cover: track.album.images[1].url,
                },
            ];

            let playTime = 0;
            for (let i = 0; i < arr.length; i++) {
                console.log("track play time: ", arr[i].duration);
                playTime += arr[i].duration;

                // setNewTracklist(arr);
            }

            setNewPlaylist({
                ...newPlaylist,
                trackList: arr,
                totalPlaytime: playTime,
            });
            // setNewPlaylist({ ...newPlaylist, totalPlaytime: playTime });

            console.log("Playlist play time: ", playTime);

            console.log("Track to add to playlist", track);
        } else {
            console.log("This track is already in the playlist");
        }
    };

    const removeFromPlaylistHandler = (trackSpotifyId) => {
        let newPlaylistTime = 0;
        console.log("Track Id to remove: ", trackSpotifyId);
        let updatedList = newPlaylist.trackList.map((track) => {
            if (track.trackSpotifyId === trackSpotifyId) {
                newPlaylistTime = newPlaylist.totalPlaytime - track.duration;
            }
        });

        updatedList = newPlaylist.trackList.filter(
            (track) => track.trackSpotifyId != trackSpotifyId
        );
        // setNewTracklist(updatedList);

        setNewPlaylist({
            ...newPlaylist,
            trackList: updatedList,
            totalPlaytime: newPlaylistTime,
        });
    };

    const createPlaylistHandler = () => {
        console.log("CREATE PLAYLIST");

        createPlaylist(newPlaylist)
            .then((res) => {
                {
                    navigate("/home");
                }
            })
            .catch((err) => {
                console.log(err);
                setErrors(err);
            });
    };

    const seedHandler = (trackSpotifyId) => {
        console.log("Seeding track with id: ", trackSpotifyId);
        newPlaylist.trackList.map((track) => {
            if (track.trackSpotifyId === trackSpotifyId) {
                setDance(track.danceability);
                setEnergy(track.energy);
                setInstru(track.instrumentalness);
                setTempo(track.tempo);
                setTrackSearch(track.artist.split(",")[0]);
                setSearchType("recommendation");
            }
        });
    };

    const seedSpotifyHandler = (trackId) => {
        console.log("Seeding Spotify track with id: ", trackId);
        spotifyTrackList.map((track) => {
            if (track.id === trackId) {
                setDance(track.audio_features.danceability);
                setEnergy(track.audio_features.energy);
                setInstru(track.audio_features.instrumentalness);
                setTempo(track.audio_features.tempo);
                setTrackSearch(track.artists[0].name);
                setSearchType("recommendation");
            }
        });
    };

    return (
        <div>
            <Nav loggedUser={user.username} />
            <form className="div_form_container" onSubmit={submitHandler}>
                <div
                    className="search_panel"
                    style={{
                        backgroundImage: `url(${searchBackgroundPanel})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    }}
                >
                    <div className="search_spacer_for_logo">
                        <div className="logo_box robot_font">
                            create your own playlist
                        </div>
                    </div>
                    <div className="search_container">
                        <div className="search_type_selection">
                            <div className="radio_button">
                                <WebAudioSwitch
                                    onSwitchClickEvent={(e) =>
                                        setSearchType(e.target.id)
                                    }
                                    src={redButton}
                                    width={30}
                                    height={30}
                                    id="artist"
                                    type="radio"
                                    group="typeSearch"
                                    value={searchType == "artist" ? 1 : 0}
                                ></WebAudioSwitch>
                                <label className="search_labels">Artist</label>
                            </div>
                            <div className="radio_button">
                                <WebAudioSwitch
                                    onSwitchClickEvent={(e) =>
                                        setSearchType(e.target.id)
                                    }
                                    src={redButton}
                                    width={30}
                                    height={30}
                                    id="track"
                                    type="radio"
                                    group="typeSearch"
                                    value={searchType == "track" ? 1 : 0}
                                ></WebAudioSwitch>
                                <label className="search_labels">Track</label>
                            </div>
                            <div className="radio_button">
                                <WebAudioSwitch
                                    onSwitchClickEvent={(e) =>
                                        setSearchType(e.target.id)
                                    }
                                    src={redButton}
                                    width={30}
                                    height={30}
                                    id="album"
                                    type="radio"
                                    group="typeSearch"
                                    value={searchType == "album" ? 1 : 0}
                                ></WebAudioSwitch>
                                <label className="search_labels">Album</label>
                            </div>
                            <div className="radio_button">
                                <WebAudioSwitch
                                    onSwitchClickEvent={(e) =>
                                        setSearchType(e.target.id)
                                    }
                                    src={redButton}
                                    width={30}
                                    height={30}
                                    id="recommendation"
                                    type="radio"
                                    group="typeSearch"
                                    value={
                                        searchType == "recommendation" ? 1 : 0
                                    }
                                ></WebAudioSwitch>
                                <label className="search_labels">
                                    Recommendations
                                </label>
                            </div>
                        </div>
                        <div className="search_field_and_advanced">
                            <div className="top_search_container">
                                <div className="search_field_container">
                                    <label className="search_labels">
                                        search field
                                    </label>
                                    <div className="search_field">
                                        <input
                                            onChange={(e) =>
                                                setTrackSearch(e.target.value)
                                            }
                                            type="text"
                                            name="songname"
                                            value={trackSearch}
                                        />
                                    </div>
                                </div>
                                <div className="digital_display_container">
                                    <div className="lcd_screen">
                                        <p className="digital_font">
                                            {errors.searchField
                                                ? errors.searchField.message
                                                : null}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="advanced_filters">
                                <div className="knob_filters">
                                    <label className="search_labels">
                                        danceability
                                    </label>
                                    <WebAudioKnob
                                        id="dance"
                                        src={littlePhatty}
                                        bodyColor="#000"
                                        conv={null}
                                        defvalue={0}
                                        diameter={50}
                                        enable={5}
                                        height={null}
                                        highlightColor="#fff"
                                        indicatorColor="#e00"
                                        log={0}
                                        max={10}
                                        midicc={null}
                                        midilearn={0}
                                        min={0}
                                        onKnobEvent={(e) =>
                                            setDance(e.target.value / 10)
                                        }
                                        onKnobInput={function noRefCheck() {}}
                                        outline={0}
                                        sensitivity={1}
                                        sprites={null}
                                        step={1}
                                        tooltip="tooltip text"
                                        value={dance * 10}
                                        valuetip={1}
                                        width={null}
                                    />
                                    <WebAudioParam
                                        link="dance"
                                        value={Math.round(dance) * 10}
                                    />
                                </div>
                                <div className="knob_filters">
                                    <label className="search_labels">
                                        energy
                                    </label>
                                    <WebAudioKnob
                                        id="energy"
                                        src={littlePhatty}
                                        bodyColor="#000"
                                        conv={null}
                                        defvalue={0}
                                        diameter={50}
                                        enable={5}
                                        height={null}
                                        highlightColor="#fff"
                                        indicatorColor="#e00"
                                        log={0}
                                        max={10}
                                        midicc={null}
                                        midilearn={0}
                                        min={0}
                                        onKnobEvent={(e) =>
                                            setEnergy(e.target.value / 10)
                                        }
                                        onKnobInput={function noRefCheck() {}}
                                        outline={0}
                                        sensitivity={1}
                                        sprites={null}
                                        step={1}
                                        tooltip="tooltip text"
                                        value={energy * 10}
                                        valuetip={1}
                                        width={null}
                                    />
                                    <WebAudioParam
                                        link="energy"
                                        value={Math.round(energy) * 10}
                                    />
                                </div>
                                <div className="knob_filters">
                                    <label className="search_labels">
                                        instrumentalness
                                    </label>
                                    <WebAudioKnob
                                        id="instru"
                                        src={littlePhatty}
                                        bodyColor="#000"
                                        conv={null}
                                        defvalue={0}
                                        diameter={50}
                                        enable={5}
                                        height={null}
                                        highlightColor="#fff"
                                        indicatorColor="#e00"
                                        log={0}
                                        max={10}
                                        midicc={null}
                                        midilearn={0}
                                        min={0}
                                        onKnobEvent={(e) =>
                                            setInstru(e.target.value / 10)
                                        }
                                        onKnobInput={function noRefCheck() {}}
                                        outline={0}
                                        sensitivity={1}
                                        sprites={null}
                                        step={1}
                                        tooltip="tooltip text"
                                        value={instru * 10}
                                        valuetip={1}
                                        width={null}
                                    />
                                    <WebAudioParam
                                        link="instru"
                                        value={Math.round(instru) * 10}
                                    />
                                </div>
                                <div className="knob_filters">
                                    <label className="search_labels">
                                        tempo
                                    </label>
                                    <WebAudioKnob
                                        id="tempo"
                                        src={littlePhatty}
                                        bodyColor="#000"
                                        conv={null}
                                        defvalue={0}
                                        diameter={50}
                                        enable={5}
                                        height={null}
                                        highlightColor="#fff"
                                        indicatorColor="#e00"
                                        log={0}
                                        max={200}
                                        midicc={null}
                                        midilearn={0}
                                        min={0}
                                        onKnobEvent={(e) =>
                                            setTempo(e.target.value)
                                        }
                                        onKnobInput={function noRefCheck() {}}
                                        outline={0}
                                        sensitivity={1}
                                        sprites={null}
                                        step={1}
                                        tooltip="tooltip text"
                                        value={tempo}
                                        valuetip={1}
                                        width={null}
                                    />
                                    <WebAudioParam
                                        link="tempo"
                                        value={Math.round(tempo)}
                                    />
                                </div>
                            </div>
                            <button>SEARCH</button>
                        </div>
                        <div className="player_container">
                            <div className="audio_player">Audio Player</div>
                        </div>
                    </div>
                    <form />
                </div>
            </form>
            <div className="div_playlists_container">
                <div className="Spotify_list_div">
                    {spotifyTrackList.map((track) => (
                        <div key={track.id} className="track_div">
                            <div className="track_data">
                                <div className="album_cover">
                                    {/* {console.log(track.album.images[0].url)} */}
                                    <img
                                        className="cover_image"
                                        src={track.album.images[1].url}
                                        alt=""
                                    />
                                </div>
                                <div className="track_information">
                                    <p className="track_name">{track.name}</p>
                                    <p className="artists_div">
                                        {track.artists.map(
                                            (artist) => `${artist.name}, `
                                        )}
                                    </p>
                                </div>
                                <div className="extra_data">
                                    <div className="track_features_left_values">
                                        <div className="audio_feature">
                                            <p className="action_labels">
                                                instru.
                                            </p>
                                            <WebAudioParam
                                                value={Math.round(
                                                    track.audio_features
                                                        .instrumentalness * 10
                                                )}
                                            />
                                        </div>
                                        <div className="audio_feature">
                                            <p className="action_labels">
                                                dance.
                                            </p>
                                            <WebAudioParam
                                                value={Math.round(
                                                    track.audio_features
                                                        .danceability * 10
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="track_features_right_values">
                                        <div className="audio_feature">
                                            <p className="action_labels">
                                                energy
                                            </p>
                                            <WebAudioParam
                                                outline={"white"}
                                                value={Math.round(
                                                    track.audio_features
                                                        .energy * 10
                                                )}
                                            />
                                        </div>
                                        <div className="audio_feature">
                                            <p className="action_labels">
                                                tempo
                                            </p>
                                            <WebAudioParam
                                                value={Math.round(
                                                    track.audio_features.tempo
                                                )}
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
                                    onClick={() => addToPlaylistHandler(track)}
                                >
                                    ADD
                                </label>

                                <WebAudioSwitch
                                    width={50}
                                    height={20}
                                    src={greenButton}
                                    type="kick"
                                />

                                <label className="action_labels">PREVIEW</label>
                                <WebAudioSwitch
                                    width={50}
                                    height={20}
                                    src={greenButton}
                                    type="kick"
                                />
                                <label className="action_labels">SEED</label>
                                <WebAudioSwitch
                                    width={50}
                                    height={20}
                                    src={greenButton}
                                    type="kick"
                                    onSwitchClick={() =>
                                        seedSpotifyHandler(track.id)
                                    }
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
                </div>
                <div className="create_list_div">
                    <div className="playlist_info_container">
                        <div className="playlist_title_container">
                            <p className="playlist_title_label roboto_font">
                                Playlist title
                            </p>
                            <div
                                className={
                                    errors.name
                                        ? "red_title_tape"
                                        : "title_tape"
                                }
                            >
                                <input
                                    className="title_field shantell-sans-handfont"
                                    onChange={(e) =>
                                        setNewPlaylist({
                                            ...newPlaylist,
                                            name: e.target.value,
                                        })
                                    }
                                    type="text"
                                />
                            </div>
                        </div>

                        <div className="playlist_action_container">
                            <label className="action_labels">CREATE</label>
                            <button
                                className="create_button"
                                onClick={() => createPlaylistHandler()}
                            ></button>
                        </div>
                        <div className="playlist_info_data">
                            <div className="track_counter">
                                <label>#</label>
                                <div className="track_count_display">
                                    <p className="track_count_number digital_font">
                                        {newPlaylist.trackList.length}
                                    </p>
                                </div>

                                {/* <Display height={20} value={2} /> */}
                            </div>
                        </div>
                    </div>
                    {newPlaylist.trackList.map((track) => (
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
                                    <p className="artists_div">
                                        {track.artist}
                                    </p>
                                </div>
                                <div className="extra_data">
                                    <div className="track_features_left_values">
                                        <div className="audio_feature">
                                            <p className="action_labels">
                                                instru.
                                            </p>
                                            <WebAudioParam
                                                value={Math.round(
                                                    track.instrumentalness * 10
                                                )}
                                            />
                                        </div>
                                        <div className="audio_feature">
                                            <p className="action_labels">
                                                dance.
                                            </p>
                                            <WebAudioParam
                                                value={Math.round(
                                                    track.danceability * 10
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="track_features_right_values">
                                        <div className="audio_feature">
                                            <p className="action_labels">
                                                energy
                                            </p>
                                            <WebAudioParam
                                                outline={"white"}
                                                value={Math.round(
                                                    track.energy * 10
                                                )}
                                            />
                                        </div>
                                        <div className="audio_feature">
                                            <p className="action_labels">
                                                tempo
                                            </p>
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
                                    onClick={() =>
                                        removeFromPlaylistHandler(
                                            track.trackSpotifyId
                                        )
                                    }
                                >
                                    REMOVE
                                </label>

                                <WebAudioSwitch
                                    width={50}
                                    height={20}
                                    src={greenButton}
                                    type="kick"
                                />

                                <label className="action_labels">PREVIEW</label>
                                <WebAudioSwitch
                                    width={50}
                                    height={20}
                                    src={greenButton}
                                    type="kick"
                                />
                                <label className="action_labels">SEED</label>
                                <WebAudioSwitch
                                    width={50}
                                    height={20}
                                    src={greenButton}
                                    type="kick"
                                    onSwitchClick={() =>
                                        seedSpotifyHandler(track.trackSpotifyId)
                                    }
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
                </div>
            </div>
        </div>
    );
};

export default CreatePlaylist;
