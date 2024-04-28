import React, { useState, useContext, useEffect } from "react";
import { userContext } from "../context/userContext";
import { Link, useParams } from "react-router-dom";
import { createPlaylist, getPlaylistById } from "../services/PlaylistService";
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

import MultiRangeSlider from "multi-range-slider-react";
import { Display } from "react-7-segment-display";
import {
    WebAudioSwitch,
    WebAudioKnob,
    WebAudioParam,
} from "webaudio-controls-react-typescript";

const CreatePlaylist = (props) => {
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
        description: "",
        createdBy: user.username,
        likes: 0,
        privacySetting: "public",
        totalPlaytime: 532423,
        trackList: [],
    });
    const [newTracklist, setNewTracklist] = useState([]);

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
        let artistString = "";
        for (let i = 0; i < track.artists.length; i++) {
            i === 0
                ? (artistString += track.artists[i].name)
                : (artistString += ", " + track.artists[i].name);
        }

        setNewTracklist([
            ...newTracklist,
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
        ]);
        console.log("Track to add to playlist", track);
    };

    const removeFromPlaylistHandler = (trackSpotifyId) => {
        console.log("Track Id to remove: ", trackSpotifyId);
        let updatedList = newTracklist.filter(
            (track) => track.trackSpotifyId != trackSpotifyId
        );
        setNewTracklist(updatedList);
    };

    const createPlaylistHandler = () => {
        console.log("CREATE PLAYLIST");

        createPlaylist(newPlaylist)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
                setErrors(err);
            });
    };

    const seedHandler = (trackSpotifyId) => {
        console.log("Seeding track with id: ", trackSpotifyId);
        newTracklist.map((track) => {
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

    useEffect(() => {
        let playTime = 0;
        for (let i = 0; i < newTracklist.length; i++) {
            playTime += newTracklist[i].duration;
        }

        setNewPlaylist({ ...newPlaylist, totalPlaytime: playTime });
        setNewPlaylist({ ...newPlaylist, createdBy: user.username });
        setNewPlaylist({ ...newPlaylist, trackist: newTracklist });
    }, [newTracklist]);

    return (
        <div>
            <Nav />
            <form onSubmit={submitHandler}>
                <div
                    className="search_panel"
                    style={{
                        backgroundImage: `url(${searchBackgroundPanel})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    }}
                >
                    <div className="search_spacer_for_logo">
                        <div className="logo_box">CREATE YOUR OWN PLAYLIST</div>
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
                            <label className="search_labels">Search</label>
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
                            <div className="advanced_filters">
                                <div className="knob_filters">
                                    <label className="search_labels">
                                        Danceability
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
                                    <WebAudioParam link="dance" />
                                </div>
                                <div className="knob_filters">
                                    <label className="search_labels">
                                        Energy
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
                                    <WebAudioParam link="energy" />
                                </div>
                                <div className="knob_filters">
                                    <label className="search_labels">
                                        Instrumentalness
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
                                    <WebAudioParam link="instru" />
                                </div>
                                <div className="knob_filters">
                                    <label className="search_labels">
                                        Tempo
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
                                    <WebAudioParam link="tempo" />
                                </div>
                            </div>
                        </div>
                        <div className="search_action">
                            <button>SEARCH</button>
                        </div>
                    </div>
                    <form />
                    <label>Search</label>

                    <button className="btn-info">Search</button>
                </div>
            </form>
            <div className="div_playlists_container">
                <div className="Spotify_list_div">
                    {spotifyTrackList.map((track) => (
                        <div key={track.id} className="track_div">
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
                                <div className="extra_data">
                                    <p>BPM : {track.audio_features.tempo}</p>
                                    <p>
                                        Danceability:{" "}
                                        {track.audio_features.danceability}
                                    </p>
                                    <p>Energy: {track.audio_features.energy}</p>
                                    <p>
                                        instrumentalness:{" "}
                                        {track.audio_features.instrumentalness}
                                    </p>
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
                                <button
                                    onClick={() => addToPlaylistHandler(track)}
                                    className=" add_button bi bi-plus"
                                    type="button"
                                ></button>
                            </div>
                            {/* // track.id // track.album.images[1] //
                                    track.name // track.artists[] // */}
                        </div>
                    ))}
                </div>
                <div className="create_list_div">
                    <div className="playlist_info_container">
                        <div className="playlist_title_container">
                            <p className="playlist_title_label">
                                Playlist title
                            </p>
                            <div className="title_tape">
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
                        <div>
                            <Display height={20} value={18} />
                        </div>
                    </div>
                    {newTracklist.map((track) => (
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
                                                INSTRU.
                                            </p>
                                            <WebAudioParam
                                                value={Math.round(
                                                    track.instrumentalness * 10
                                                )}
                                            />
                                        </div>
                                        <div className="audio_feature">
                                            <p className="action_labels">
                                                DANCE.
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
                                                ENERGY
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
                                                Tempo
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
                                <label className="action_labels">REMOVE</label>

                                <WebAudioSwitch
                                    width={50}
                                    height={20}
                                    src={greenButton}
                                    type="kick"
                                    onSwitchClick={() =>
                                        removeFromPlaylistHandler(
                                            track.trackSpotifyId
                                        )
                                    }
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
                                        seedHandler(track.trackSpotifyId)
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
                    <button onClick={() => createPlaylistHandler()}>
                        Create Playlist
                    </button>
                </div>
            </div>

            <button onClick={() => getTracks("Fred againg")}>TEST</button>
        </div>
    );
};

export default CreatePlaylist;
