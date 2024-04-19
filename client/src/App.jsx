import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import SpotifyLogin from "./views/SpotifyLogin";
import Register from "./views/Register";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/spotifylogin" element={<SpotifyLogin />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    );
}

export default App;
