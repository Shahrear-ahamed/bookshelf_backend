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
    meta: result.meta,
    data: result.data,
  })
})

export const BookController = {
  createBook,
  getAllBooks,
}