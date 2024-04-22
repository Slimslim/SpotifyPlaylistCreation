import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
async function dbConnect() {
    try {
        // connection to the login_reg database
        await connect(MONGODB_URI, {
            dbName: "login_reg",
        });
        console.log(
            "Pinged your deployment. You successfully connected to login_reg!"
        );

        // connection to the playlist database
        await connect(MONGODB_URI, {
            dbName: "playlistsDB",
        });
        console.log(
            "Pinged your deployment. You successfully connected to playlistsDB!"
        );
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export default dbConnect;
