import "./App.css";
import "./styles/Font.css";

import { Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import SpotifyLogin from "./views/SpotifyLogin";
import Register from "./views/Register";
import HomePage from "./views/HomePage";
import PlaylistDetails from "./views/PlaylistDetails";
import CreatePlaylist from "./views/CreatePlaylist";
import MyPlaylists from "./views/MyPlaylists";
import UpdatePlaylist from "./views/UpdatePlaylist";

// fonts

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/spotifylogin" element={<SpotifyLogin />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/playlist/:id" element={<PlaylistDetails />} />
                <Route path="/create" element={<CreatePlaylist />} />
                <Route path="/myplaylists" element={<MyPlaylists />} />
                <Route
                    path="/update/:playlistId"
                    element={<UpdatePlaylist />}
                />
            </Routes>
        </>
    );
}

export default App;
