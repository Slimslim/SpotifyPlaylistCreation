import {model, Schema } from "mongoose";

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Book title is required"],
            minlength: [2, "Title must be at least 2 characters long!"],
            maxlength: [255, "Title must be less than 255 characters long!"]
        },
        author: {
            type: String,
            required: [true, "Book author name is required"],
            minlength: [5, "Author name must be at least 5 characters long!"],
            maxlength: [255, "Author name must be less than 255 characters long!"]
        },
        pages: {
            type: Number,
            required: [true, "Page amount is required!"],
            min: [1, "Page amount must be at least 1!"],
        },
        isAvailable: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);
const Book = model('Book', bookSchema);
export default Book;