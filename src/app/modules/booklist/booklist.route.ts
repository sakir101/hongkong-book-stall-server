import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { BookValidation } from '../book/book.validation'
import { BookController } from '../book/book.controller'

const router = express.Router()

router.post('/', validateRequest
    (BookValidation.createBookZodSchema),
    BookController.addBookToBookList
)
router.patch('/:id', validateRequest
    (BookValidation.updateBookZodSchema), BookController.updateBookList)

router.get('/', BookController.getAllBooksFromBookList)

export const BookLstRoutes = router