import Playlist from "../models/playlist.model.js";

async function createPlaylist(req, res) {
    try {
        const playlist = await Playlist.create(req.body);
        //201 for successful posts requests
        return res.status(201).json(playlist);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
        // throw err.response.data.errors;
    }
}

async function getAllPlaylists(req, res) {
    try {
        const allPlaylist = await Playlist.find({});
        // 200 for successful get requests
        return res.status(201).json(allPlaylist);
    } catch (err) {
        return res.status(500).json(err);
    }
}

async function getOnePlaylistById(req, res) {
    try {
        const playlistId = req.params.id;
        const playlist = await Playlist.findById({ _id: playlistId });
        // 200 for successful get requests
        return res.status(200).json(playlist);
    } catch (err) {
        return res.status(500).json(err);
    }
}

async function deleteById(req, res) {
    try {
        const playlistId = req.params.id;
        const response = await Playlist.findByIdAndDelete({ _id: playlistId });
        // 200 for successful get requests
        return res.status(204).send();
    } catch (err) {
        return res.status(500).json(err);
    }
}

async function updatePlaylistById(req, res) {
    try {
        const playlistId = req.params.id;
        const updates = req.body;
        const updatedPlaylist = await Playlist.findByIdAndUpdate(
            playlistId,
            updates,
            { runValidators: true, new: true }
        );
        // new:true -> returns the playlist after update (otherwise you get the response with the old information)
        return res.status(200).json(updatedPlaylist);
    } catch (err) {
        return res.status(500).json(err);
    }
}

export {
    createPlaylist,
    getAllPlaylists,
    getOnePlaylistById,
    deleteById,
    updatePlaylistById,
};
