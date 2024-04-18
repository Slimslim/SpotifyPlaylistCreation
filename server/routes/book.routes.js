import { Router } from "express";
import * as bookController from "../controllers/book.controller.js"
const router = Router();

router.route('/books')
    .get(bookController.getAllBooks)
    .post(bookController.createBook)

router.route('/books/:id')
    .get(bookController.getOneBookById)
    .delete(bookController.deleteById)
    .put(bookController.updateBookById)


export default router;