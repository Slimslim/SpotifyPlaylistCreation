import { Router } from "express";
import * as playlistController from "../controllers/playlist.controller.js";
const router = Router();

router
    .route("/playlists")
    .post(playlistController.createPlaylist)
    .get(playlistController.getAllPlaylists);

router
    .route("/playlists/:id")
    .get(playlistController.getOnePlaylistById)
    .delete(playlistController.deleteById)
    .put(playlistController.updatePlaylistById);

export default router;
