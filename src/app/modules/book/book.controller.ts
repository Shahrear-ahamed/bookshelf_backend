import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IBook } from './book.interface'
import { BookService } from './book.service'

const createBook = catchAsync(async (req, res) => {
  const bookData = req.body

  const result = await BookService.createBook(bookData)

  sendResponse<IBook>(res, {
    statusCode: httpStatus.CREATED,
    status: true,
    message: 'Book created successfully',
    data: result,
  })
})

export const BookController = {
  createBook,
}
