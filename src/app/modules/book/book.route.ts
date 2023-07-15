import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { BookController } from './book.controller'
import { BookValidation } from './book.validation'

const router = express.Router()

router.post(
  '/add-new-book',
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook,
)

export const bookRoutes = router
