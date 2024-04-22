import axios from "axios";
import queryString from "query-string";
// import express from "express";

const SCOPES =
    "user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read";
// const REDIRECT_URI = "http://localhost:5173/";

// create base URL fot Token
const http = axios.create({
    spotifyTokenURI: import.meta.env.VITE_SPOTIFY_TOKEN_ENDPOINT,
});

// STEP 1: request a spotify code
// Function to connect to Spotify to get code
function requestAuthorization() {
    // value to add protection (Should go get the client cookie here)
    // var state = import.meta.env.VITE_STATE_RANDOM;

    // // Simpler unsafe method. get token
    // let url =
    //     "https://accounts.spotify.com/authorize?" +
    //     queryString.stringify({
    //         response_type: "token",
    //         client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    //         scope: SCOPES,
    //         redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
    //         state: import.meta.env.VITE_STATE_RANDOM,
    //     });

    //Old method to first get the code
    let url = "https://accounts.spotify.com/authorize?";

    url += queryString.stringify({
        response_type: "code",
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        scope: SCOPES,
        redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
        // state: import.meta.env.VITE_STATE_RANDOM,
    });

    console.log("URL from requestAuth: ", url);
    window.location.href = url;
}

// STEP 2: get code to then ask for the Token
// Function to extract token from the return url address
const spotifyRedirectHandler = (hash) => {
    // get everthiing that comes after the #
    const stringAfterHashtag = hash.substring(1);
    // split the string at the & to get Token, token_type, expiresIn
    const paramsInUrl = stringAfterHashtag.split("&");

    //
    const paramSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
        // console.log(currentVaue);
        const [key, value] = currentValue.split("=");
        accumulater[key] = value;
        return accumulater;
    }, []);

    return paramSplitUp;
};

////// GET ACCESS TOKEN //////

function requestToken(code) {
    // create URL for the request
    let url = queryString.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        client_secret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
        // state: import.meta.env.VITE_STATE_RANDOM,
    });

    // make the call
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://accounts.spotify.com/authorize", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader(
        "Authorization",
        "Basic " +
            btoa(
                import.meta.env.SPOTIFY_CLIENT_ID +
                    ":" +
                    import.meta.env.SPOTIFY_CLIENT_SECRET
            )
    );
    console.log("body ", body);
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

///////////////////// STEP 3 //////////////////////
// Step 3: send user to login on Soptify

// var app = express();

// async function getAuthToken(req, res) {
//     var code = req.query.code || null;
//     var state = req.query.state || null;
//     try {
//         const store = await http.get("/SpotifyLogin");

//         var authOptions = {
//             url: 'https://accounts.spotify.com/api/token',
//             form: {
//               code: code,
//               redirect_uri: redirect_uri,
//               grant_type: 'authorization_code'
//             },
//             headers: {
//               'content-type': 'application/x-www-form-urlencoded',
//               'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
//             },
//             json: true
//         // 201 for successful posts requests
//         return res.status(201).json(store);
//     } catch (err) {
//         return res.status(500).json(err);
//     }
// }

// app.get("/login", function (req, res) {
//     var state = generateRandomString(16);
//     var scope = "user-read-private user-read-email";

//     res.redirect(
//         "https://accounts.spotify.com/authorize?" +
//             querystring.stringify({
//                 response_type: "code",
//                 client_id: client_id,
//                 scope: scope,
//                 redirect_uri: redirect_uri,
//                 state: state,
//             })
//     );
// });

/// create the http body with the code from the previous step
// function to create the HTTP body
function fetchAccessToken(code) {
    let body = import.meta.env.VITE_SPOTIFY_TOKEN_ENDPOINT;
    body += "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
    body += "&client_id=" + import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    body += "&client_secret=" + import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
    callAuthorizationApi(body);
}

function callAuthorizationApi(body) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", import.meta.env.SPOTIFY_TOKEN_ENDPOINT, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader(
        "Authorization",
        "Basic " +
            btoa(
                import.meta.env.SPOTIFY_CLIENT_ID +
                    ":" +
                    import.meta.env.SPOTIFY_CLIENT_SECRET
            )
    );
    console.log("body ", body);
    window.location.href = body;
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log(data);
        if (data.access_token != undefined) {
            var access_token = data.access_token;
            console.log(`Spotify_access TOKEN: ${access_token}`);
            localStorage.setItem("Spotify_access_token", access_token);
        }
        if (data.refresh_token != undefined) {
            var refresh_token = data.refresh_token;
            console.log(`Refresh Spotify TOKEN: ${refresh_token}`);
            localStorage.setItem("refresh_spotify_token", refresh_token);
        }
        console.log("Authorization done!!");
        onPageLoad();
    } else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}
///////////////////
///////////////////

// //Request to do after the code??
// function requestAuthorization() {
//     let url = import.meta.env.VITE_SPOTIFY_AUTH_URL;
//     url += "?client_id=" + import.meta.env.VITE_SPOTIFY_CLIENT_ID;
//     url += "&response_type=code";
//     url +=
//         "&redirect_uri=" +
//         encodeURIComponent(import.meta.env.VITE_SPOTIFY_REDIRECT_URI);
//     url += "&show_dialog=true";
//     url += "&scope=" + encodeURIComponent(SCOPES);

//     console.log(url);
//     window.location.href = url;
// }

// function that handles the page redirect to extract code and request TOKEN
function handleRedirect() {
    console.log("handeling page redirect");
    let code = getCode();
    fetchAccessToken(code);
    window.history.pushState("", "", REDIRECT_URI); // remove param from url
}

// Function to get code to request Token (WORKING)
function getCode() {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get("code");
    }
    return code;
}

("https://accounts.spotify.com/api/token");

export { requestAuthorization, spotifyRedirectHandler, fetchAccessToken };
