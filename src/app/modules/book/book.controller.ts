import httpStatus from 'http-status'
import { paginationFields } from '../../../constant/pagination'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { bookFilterableFields } from './book.constant'
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

const getAllBooks = catchAsync(async (req, res) => {
  const filterData = req.query
  const filter = pick(filterData, bookFilterableFields)
  const pagination = pick(filterData, paginationFields)

  const result = await BookService.getAllBooks(filter, pagination)

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Book retrieve successfully',
    data: result,
  })
})

const getMyBooks = catchAsync(async (req, res) => {
  const userEmail = req.user?.email

  const result = await BookService.getMyBooks(userEmail)

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'User book retrieve successfully',
    data: result,
  })
})

const getSingleBook = catchAsync(async (req, res) => {
  const bookId = req.params.id

  const result = await BookService.getSingleBook(bookId)

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Book retrieve successfully',
    data: result,
  })
})

const updateBook = catchAsync(async (req, res) => {
  const bookId = req.params.id
  const bookData = req.body

  const result = await BookService.updateBook(bookId, bookData)

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Book updated successfully',
    data: result,
  })
})

const deleteBook = catchAsync(async (req, res) => {
  const bookId = req.params.id

  const result = await BookService.deleteBook(bookId)

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Book deleted successfully',
    data: result,
  })
})

const reviewBook = catchAsync(async (req, res) => {
  const bookId = req.params.id
  const reviewData = req.body?.review

  const result = await BookService.reviewBook(bookId, reviewData)

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Book review added successfully',
    data: result,
  })
})

export const BookController = {
  createBook,
  getAllBooks,
  getMyBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  reviewBook,
}
