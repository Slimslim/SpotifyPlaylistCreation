import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Register function
const register = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        // sign a jsonwebtoken to the user
        const userToken = jwt.sign(
            { userId: newUser._id, username: newUser.username },
            process.env.SECRET_KEY
        );
        // console.log("User Token: ", userToken);
        res.cookie("userToken", userToken);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
};

// login function
const login = async (req, res) => {
    // check if user exists
    // console.log("Arguemnt passed in UserController:", req.body);
    const { email, password } = req.body;
    const potentialUser = await User.find({ email: email });
    if (!potentialUser) {
        return res.status(404).json({ message: "user not found" });
    }
    // there is a user with this email
    const isPasswordCorrect = await bcrypt.compare(
        password,
        potentialUser[0].password
    );
    if (!isPasswordCorrect) {
        return res.status(404).json({ message: "Invalid credentials" });
    }
    // the user exists and the password matches
    const userToken = jwt.sign(
        { userId: potentialUser._id, username: potentialUser.username },
        process.env.SECRET_KEY
    );
    // console.log("User Token: ", userToken);
    res.cookie("userToken", userToken);
    res.status(201).json(potentialUser);
};

// logout function
const logout = async (req, res) => {
    // console.log("logging out...: ", res);
    res.clearCookie("userToken");
    return res.status(200).json({ message: "successfully logged out" });
};

export { register, login, logout };
