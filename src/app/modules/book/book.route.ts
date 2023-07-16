import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { BookController } from './book.controller'
import { BookValidation } from './book.validation'

const router = express.Router()

router.post(
  '/add-new-book',
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook,
)

router.get('/my-books/', auth, BookController.getMyBooks)

router.get('/:id', BookController.getSingleBook)
router.get('/', BookController.getAllBooks)

export const bookRoutes = router
