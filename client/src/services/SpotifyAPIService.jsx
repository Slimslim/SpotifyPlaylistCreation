import axios from "axios";
import queryString from "query-string";
import { Buffer } from "buffer";
import { refreshToken } from "./SpotifyAuthService";

// create base URL
const http = axios.create({
    baseURL: import.meta.env.VITE_SPOTIFY_API_URL,
});

async function getRecommendation(artistSeedName, dance, energy, instru, tempo) {
    let accessToken = localStorage.getItem("access_token");
    // console.log("Search field: ", searchInput);
    // let query = encodeURIComponent(artistId);
    let searchResult = {};
    let artistId = "";

    console.log(
        "getRecommendation fct started. Searching tracks of: ",
        artistSeedName
    );
    // Get Artist Id from Spotify
    artistId = await getArtistId(artistSeedName);

    const url =
        "https://api.spotify.com/v1/recommendations?" +
        "limit=10" +
        "&market=US" +
        "&seed_artists=" +
        artistId +
        "&target_danceability=" +
        dance +
        "&target_energy=" +
        energy +
        "&target_instrumentalness=" +
        instru +
        "&target_tempo=" +
        tempo;

    console.log("Search query: ", url);

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log("getRecommendation fct Response:", response);
        searchResult = response.data.tracks;

        // return new object with tracks info and features
        return await addTrackAudioFeatures(searchResult);
    } catch (error) {
        // Handle error
        if (error.response.status == 401) {
            console.log("Token has expired---get a new one");
            refreshToken();
        } else {
            console.error("Error:", error);
        }
        throw error; // Rethrow the error to be caught by the caller
    }
}

async function getArtistTopTracks(searchedArtistName) {
    let accessToken = localStorage.getItem("access_token");
    // console.log("Search field: ", searchInput);
    // let query = encodeURIComponent(artistId);
    let searchResult = {};
    let artistId = "";

    console.log(
        "getArtistTopTracks fct started. Searching tracks of: ",
        searchedArtistName
    );
    // Get Artist Id from Spotify
    artistId = await getArtistId(searchedArtistName);

    const url =
        `https://api.spotify.com/v1/artists/` +
        artistId +
        "/top-tracks?" +
        "market=us";

    console.log("Search query: ", url);

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log("getArtistTopTracks fct Response:", response.data);
        searchResult = response.data.tracks;

        // return new object with tracks info and features
        return await addTrackAudioFeatures(searchResult);
    } catch (error) {
        // Handle error
        if (error.response.status == 401) {
            console.log("Token has expired---get a new one");
            refreshToken();
        } else {
            console.error("Error:", error);
        }
        throw error; // Rethrow the error to be caught by the caller
    }
}

// Get track list suggestion from a search query
// Returns an object with the list of the tracks with added audio features
async function getTracks(searchInput, searchType) {
    let accessToken = localStorage.getItem("access_token");
    console.log("Search field: ", searchInput);
    console.log("Search type: ", searchType);
    let query = encodeURIComponent(searchInput);
    let searchResult = {};
    let trackIdList = "";
    let trackAudioFeatures = [];

    // console.log("track to search for: ", query);
    const url =
        `https://api.spotify.com/v1/search?q=` +
        query +
        "&type=" +
        searchType +
        "&market=us" +
        "&limit=10";

    console.log("Search query: ", url);

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        //Store response
        console.log("getTracks fct Response:", response.data);
        searchResult = response.data.tracks.items;

        // ///Get tracks Audio features (comes back as an object)
        // trackIdList = extractTrackId(searchResult);
        // console.log("Response from extractTrackID:", trackIdList);
        // trackAudioFeatures = await getTracksAudioFeatures(trackIdList);
        // console.log(
        //     "Response from extractTrackAudioFeatures:",
        //     trackAudioFeatures
        // );
        // // input audio features in track list data
        // searchResult.map((track, index) => {
        //     // add new 'audio_features' field to each tracks
        //     track.audio_features = trackAudioFeatures[index];
        // });

        // // return new object with tracks info and features
        // console.log("Consolidated data from GetTracks fct: ", searchResult);

        return await addTrackAudioFeatures(searchResult);
    } catch (error) {
        // Handle error
        if (error.response.status == 401) {
            console.log("Token has expired---get a new one");
            refreshToken();
        } else {
            console.error("Error:", error);
        }
        throw error; // Rethrow the error to be caught by the caller
    }
}

// Get Album tracks
async function getAlbumTracks(searchedAlbumName) {
    let accessToken = localStorage.getItem("access_token");
    // console.log("Search field: ", searchInput);
    // let query = encodeURIComponent(artistId);
    let searchResult = {};
    let albumId = "";
    let albumData = {};

    console.log(
        "getArtistTopTracks fct started. Searching tracks of: ",
        searchedAlbumName
    );
    // Get Artist Id from Spotify
    albumId = await getAlbumId(searchedAlbumName);

    const url =
        `https://api.spotify.com/v1/albums?ids=` + albumId + "&market=us";

    console.log("Search query: ", url);

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log("getAlbumTracks fct Response:", response.data.albums[0]);
        albumData = response.data.albums[0];
        searchResult = response.data.albums[0].tracks.items;

        searchResult.map((track) => {
            // add new 'audio_features' field to each tracks
            track.album = albumData;
        });

        // Add Album information back in

        // return new object with tracks info and features
        return await addTrackAudioFeatures(searchResult);
    } catch (error) {
        // Handle error
        if (error.response.status == 401) {
            console.log("Token has expired---get a new one");
            refreshToken();
        } else {
            console.error("Error:", error);
        }
        throw error; // Rethrow the error to be caught by the caller
    }
}

async function addTrackAudioFeatures(audioTrackList) {
    let trackIdList = "";
    let trackAudioFeatures = [];

    ///Get tracks Audio features (comes back as an object)
    trackIdList = extractTrackId(audioTrackList);
    console.log("Response from extractTrackID:", trackIdList);
    trackAudioFeatures = await getTracksAudioFeatures(trackIdList);
    console.log("Response from extractTrackAudioFeatures:", trackAudioFeatures);
    // input audio features in track list data
    audioTrackList.map((track, index) => {
        // add new 'audio_features' field to each tracks
        track.audio_features = trackAudioFeatures[index];
    });

    // return new object with tracks info and features
    console.log("Consolidated data from GetTracks fct: ", audioTrackList);
    return audioTrackList;
}

// Get artist spotify Id
// returns the id of closest artist being searched
async function getArtistId(searchInput) {
    let accessToken = localStorage.getItem("access_token");
    // console.log("Search field: ", searchInput);
    let query = encodeURIComponent(searchInput);

    // console.log("track to search for: ", query);
    const url =
        `https://api.spotify.com/v1/search?q=` +
        query +
        "&type=artist" +
        "&market=us" +
        "&limit=10";

    console.log("Search query: ", url);

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log(
            "getArtistId fct Response:",
            response.data.artists.items[0].id
        );
        return response.data.artists.items[0].id;
    } catch (error) {
        // Handle error
        if (error.response.status == 401) {
            console.log("Token has expired---get a new one");
            refreshToken();
        } else {
            console.error("Error:", error);
        }
        throw error; // Rethrow the error to be caught by the caller
    }
}

// Get artist spotify Id
// returns the id of closest artist being searched
async function getAlbumId(searchInput) {
    let accessToken = localStorage.getItem("access_token");
    // console.log("Search field: ", searchInput);
    let query = encodeURIComponent(searchInput);

    // console.log("track to search for: ", query);
    const url =
        `https://api.spotify.com/v1/search?q=` +
        query +
        "&type=album" +
        "&market=us" +
        "&limit=10";

    console.log("Search query: ", url);

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log(
            "getAlbumId fct Response:",
            response.data.albums.items[0].id
        );
        return response.data.albums.items[0].id;
    } catch (error) {
        // Handle error
        if (error.response.status == 401) {
            console.log("Token has expired---get a new one");
            refreshToken();
        } else {
            console.error("Error:", error);
        }
        throw error; // Rethrow the error to be caught by the caller
    }
}

// Function that scans the list search result with the tracks
// - extracts the track IDs and puts it into a string
const extractTrackId = (searchResult) => {
    let trackIdList = "";
    console.log("Extract track Id List data Received: ", searchResult);
    searchResult.map((trackInfo, index) => {
        // console.log("index", index);
        // console.log("track", trackInfo);
        index === 0
            ? (trackIdList += trackInfo.id)
            : (trackIdList += "," + trackInfo.id);
    });

    // console.log("encoded", trackIdList);
    return trackIdList;
};

// get tracks Audio Features
// - returns a list with audio from a list of tracks passed by a string with ids (max 100 tracks)
async function getTracksAudioFeatures(trackListString) {
    let accesstoken = localStorage.getItem("access_token");

    const url =
        `https://api.spotify.com/v1/audio-features?ids=` + trackListString;

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accesstoken}`,
            },
        });
        // console.log("Responce from getTracksAudioFeatures: ", response.data);
        return response.data.audio_features;
    } catch (error) {
        // Handle error
        if (error.response.status == 401) {
            console.log("Token has expired---get a new one");
            refreshToken();
        } else {
            console.error("Error:", error);
        }
        throw error; // Rethrow the error to be caught by the caller
    }
}

// get track list from IDs

export { getTracks, getArtistTopTracks, getAlbumTracks, getRecommendation };
