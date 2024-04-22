import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import SpotifyLogin from "./views/SpotifyLogin";
import Register from "./views/Register";
import HomePage from "./views/HomePage";
import PlaylistDetails from "./views/PlaylistDetails";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/spotifylogin" element={<SpotifyLogin />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/playlist/:id" element={<PlaylistDetails />} />
            </Routes>
        </>
    );
}

export default App;
