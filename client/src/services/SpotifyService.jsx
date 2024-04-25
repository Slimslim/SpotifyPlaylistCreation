import axios from "axios";
import queryString from "query-string";
import { Buffer } from "buffer";

// create base URL fot Token
const http = axios.create({
    spotifyTokenURI: import.meta.env.VITE_SPOTIFY_TOKEN_ENDPOINT,
});

// STEP 1: request a spotify code
// sends user to spotify to login and redirect to '/home'
function requestAuthorization() {
    let url = import.meta.env.VITE_SPOTIFY_AUTH_URL;

    url += queryString.stringify({
        response_type: "code",
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        scope: import.meta.env.VITE_SPOTIFY_SCOPES,
        redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
        state: import.meta.env.VITE_STATE_RANDOM,
    });

    // console.log("URL from requestAuth: ", url);
    window.location.href = url;
}

// // STEP 2: get code to then ask for the Token
// // Function to extract token from the return url address
function exchangeCodeForAccessToken(code, state) {
    //state value should be compared with the one sent before
    //If diffrent, abort token request

    // const encodedCredentials = Buffer.from(
    //     `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${
    //         import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
    //     }`
    // ).toString("base64");

    axios
        .post(
            import.meta.env.VITE_SPOTIFY_TOKEN_ENDPOINT,
            new URLSearchParams({
                grant_type: "authorization_code",
                redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
                code: code,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${Buffer.from(
                        `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${
                            import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
                        }`
                    ).toString("base64")}`,
                },
            }
        )

        .then((res) => {
            // console.log(res.data);
            // These are all the information we get back. Just keeping token and refresh token
            // const { access_token, refresh_token, scope, token_type, expires_in}
            const { access_token, refresh_token } = res.data;
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);
        })
        .catch((err) => console.log(err.message));
}

export { requestAuthorization, exchangeCodeForAccessToken };
