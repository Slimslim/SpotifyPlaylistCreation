import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        // sign a jsonwebtoken to the user
        const userToken = jwt.sign(
            { userId: newUser._id , username: newUser.username},
            process.env.SECRET_KEY
        )
        // console.log("User Token: ", userToken);
        res.cookie('userToken', userToken);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
}