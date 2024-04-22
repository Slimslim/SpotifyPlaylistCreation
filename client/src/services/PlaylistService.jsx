import axios from "axios";

// create base URL
const http = axios.create({
    baseURL: import.meta.env.VITE_URL,
});

// get all books
async function getAllPlaylists() {
    return http
        .get("/playlists")
        .then((response) => response.data)
        .catch((err) => {
            throw err;
        });
}

// get one playlist by Id
async function getPlaylistById(id) {
    return http
        .get(`/playlists/${id}`)
        .then((response) => response.data)
        .catch((err) => {
            throw err;
        });
}

// create new playlist
async function createPlaylist(newPlaylist) {
    return http
        .post("/playlists", newPlaylist)
        .then((response) => response.data)
        .catch((err) => {
            throw err.response.data.errors;
        });
}

// update playlist information
async function updatePlaylistById(id, updates) {
    return http
        .put(`/playlists/${id}`, updates)
        .then((response) => response.data)
        .catch((err) => {
            throw err.response.data.errors;
        });
}

// Delete playlist by Id
async function deletePlaylistById(id) {
    return http
        .delete(`/playlists/${id}`)
        .then((response) => response.data)
        .catch((err) => {
            throw err.response.data.errors;
        });
}

export {
    getAllPlaylists,
    getPlaylistById,
    createPlaylist,
    updatePlaylistById,
    deletePlaylistById,
};
