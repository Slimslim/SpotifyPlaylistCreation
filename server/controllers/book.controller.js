import Book from "../models/book.model.js";

async function createBook(req,res){
    try {
        const book = await Book.create(req.body);
        // 201 for successful posts requests
        return res.status(201).json(book);
    } catch (err) {
        return res.status(500).json(err);
    }
}

async function getAllBooks (req,res){
    try {
        const allBooks = await Book.find({});
        // 200 for successful get requests
        return res.status(200).json(allBooks);
    } catch (err) {
        return res.status(500).json(err);
    }
}

async function getOneBookById (req,res){
    try {
        const bookId = req.params.id
        const book = await Book.findById({_id:bookId});
        // 200 for successful get requests
        return res.status(200).json(book);

    } catch (err) {
        return res.status(500).json(err);
    }
}

async function deleteById (req,res) {
    try {
        const bookId = req.params.id
        const response = await Book.findByIdAndDelete({_id:bookId});
        // 200 for successful get requests
        return res.status(204).send();
    } catch (err) {
        return res.status(500).json(err);
    }
}
async function updateBookById (req,res){
    try {
        const bookId = req.params.id;
        const updates = req.body;
        const updatedBook = await Book.findByIdAndUpdate(bookId, updates, {runValidators: true, new:true});
        // new:true -> returns the book after update (otherwise you get the response with the old information)
        return res.status(200).json(updatedBook);
    } catch (err) {
        return res.status(500).json(err);
    }
}

// async function getOneBookByTitle (req,res){
//     try {
//         console.log("Book by title has been called!");

//         const bookTitle = req.params.title
//         const bookId = await Book.find({title:bookTitle});
//         // const book = await Book.findById();
//         // 200 for successful get requests
//         return res.status(200).json(book);

//     } catch (err) {
//         return res.status(500).json(err);
//     }
// }

export { createBook , getAllBooks , getOneBookById, deleteById, updateBookById};