import { model, Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
// import validator from "validator";
import bcrypt from "bcrypt";
import isEmail from "validator/lib/isEmail.js";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: [true, "That username is already taken"],
            minlength: [1, "Username must be at least 1 characters long!"],
            maxlength: [255, "Username must be less than 255 characters long!"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: [true, "That email is already taken"],
            validate: [isEmail, "Invalid email"],
        },
        password: {
            type: String,
            required: [true, "Password is required!"],
            minlength: [8, "Password must be at least 8 characters long!"],
        },
    },
    { timestamps: true }
);

userSchema.plugin(mongooseUniqueValidator);

// Middleware
userSchema
    .virtual("confirmPassword")
    .get(function () {
        return this._confirmPassword;
    })
    .set(function (value) {
        this._confirmPassword = value;
    });

userSchema.pre("validate", function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Passwords don't match");
    }
    next();
});

userSchema.pre("save", function (next) {
    bcrypt.hash(this.password, 10).then((hash) => {
        this.password = hash;
        next();
    });
});
// end of Middleware

const User = model("user", userSchema);
export default User;
