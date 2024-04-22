import { model, Schema } from "mongoose";

const trackSchema = new Schema(
    {
        name: { type: String, required: [true, "track Name is required"] },
        artist: { type: String, required: [true, "Track Artist is required"] },
        album: { type: String, required: [true, "track Album is required"] },
        bpm: { type: Number, required: [true, "track bpm is required"] },
        duration: {
            type: Number,
            required: [true, "track duration is required"],
        },
        trackSpotifyId: {
            type: String,
            required: [true, "SpotifyId is required"],
        },
    },
    { timestamps: true }
);

const playlistSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Playlist name is required"],
            unique: [true, "Playlist name is already taken"],
            minlength: [1, "Playlist name must be at least 2 characters long!"],
            maxlength: [
                255,
                "Playlist name must be less than 255 characters long!",
            ],
        },
        description: {
            type: String,
            required: [false],
            minlength: [
                5,
                "Playlist description must be at least 5 characters long!",
            ],
            maxlength: [
                255,
                "Playlist description must be less than 255 characters long!",
            ],
        },
        createdBy: {
            type: String,
            required: [true, "CreatedBy information is required"],
        },
        trackList: [trackSchema],
        totalPlaytime: {
            type: Number,
            required: [true, "total playlist run time is required"],
        },
        likes: {
            type: Number,
            default: 0,
        },
        privacySetting: {
            type: String,
            enum: ["public", "private"],
            default: "public",
        },
    },
    { timestamps: true }
);

const Playlist = model("Playlist", playlistSchema);
export default Playlist;
