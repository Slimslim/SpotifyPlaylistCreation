import axios from "axios";

// create base URL
const http = axios.create({
    baseURL: import.meta.env.VITE_SPOTIFY_API_URL,
});

// get artist
async function getArtist(access_token) {
    console.log("Spotify Search started...");
    console.log("prop passed: ", access_token);

    axios
        .get(`https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg`, {
            headers: {
                Authorization: "Bearer" + access_token,
            },
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

    // try {
    //     const response = await axios.get(`${http}/artists`, {
    //         headers: {
    //             Authorization: "Bearer" + access_token,
    //         },
    //     });
    //     if (response.statusText) {
    //         const data = await response.json();
    //         console.log("Spotify response: ", data);
    //         return data;
    //     } else {
    //         console.error(
    //             "Failed to search for artist:",
    //             response.status,
    //             response.statusText
    //         );
    //         return null;
    //     }
    // } catch (error) {
    //     console.error("Error searching for artist:", error);
    //     return null;
    // }

    // try {
    //     const response = await fetch(`${http}/artists/0TnOYISbd1XYRBk9myaseg`, {
    //         headers: {
    //             Authorization: `Bearer ${access_token}`,
    //         },
    //     });

    //     if (response.ok) {
    //         const data = await response.json();
    //         console.log("Spotify response: ", data);
    //         return data;
    //     } else {
    //         console.error(
    //             "Failed to search for artist:",
    //             response.status,
    //             response.statusText
    //         );
    //         return null;
    //     }
    // } catch (error) {
    //     console.error("Error searching for artist:", error);
    //     return null;
    // }
}

export { getArtist };
