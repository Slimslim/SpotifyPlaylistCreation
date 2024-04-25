import axios from "axios";
import queryString from "query-string";
import { Buffer } from "buffer";

// create base URL
const http = axios.create({
    baseURL: import.meta.env.VITE_SPOTIFY_API_URL,
});

// Get track list suggestion from a search query
// Returns an object with the list of the tracks with added audio features
async function getTracks(searchInput) {
    let accessToken = localStorage.getItem("access_token");
    console.log("Input params: ", searchInput);
    let query = encodeURIComponent(searchInput);
    let searchResult = {};
    let trackIdList = "";
    let trackAudioFeatures = [];

    // console.log("track to search for: ", query);
    const url =
        `https://api.spotify.com/v1/search?q=` +
        query +
        "&type=track" +
        "&market=us" +
        "&limit=10";

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        //Store response
        console.log("getTracks fct Response:", response.data);
        searchResult = response.data;

        ///Get tracks Audio features (comes back as an object)
        trackIdList = extractTrackId(response.data);
        trackAudioFeatures = await getTracksAudioFeatures(trackIdList);

        // input audio features in track list data
        searchResult.tracks.items.map((track, index) => {
            // add new 'audio_features' field to each tracks
            track.audio_features = trackAudioFeatures[index];
        });

        // return new object with tracks info and features
        return searchResult;
    } catch (error) {
        // Handle error
        if (error.response.status == 401) {
            console.log("Token has expired---get a new one");
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
    console.log("Data Received: ", searchResult.tracks.items);
    searchResult.tracks.items.map((trackInfo, index) => {
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
        } else {
            console.error("Error:", error);
        }
        throw error; // Rethrow the error to be caught by the caller
    }
}

export { getTracks };
