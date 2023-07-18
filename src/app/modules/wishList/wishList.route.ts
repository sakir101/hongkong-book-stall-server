import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { BookValidation } from '../book/book.validation'
import { BookController } from '../book/book.controller'

const router = express.Router()

router.post('/', validateRequest
    (BookValidation.createBookZodSchema),
    BookController.addBookToWishList
)

router.delete('/:id', BookController.deleteBookFromWishList)

router.get('/', BookController.getAllBooksFromWishList)

export const WishLstRoutes = router
