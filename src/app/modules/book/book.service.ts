import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiErrors'
import { calculatePagination } from '../../../helpers/paginationHelper'
import { IPagination } from '../../../interfaces/pagination'
import { bookSearchableField } from './book.constant'
import { IBook, IBookFilterableFields } from './book.interface'
import Book from './book.model'

const createBook = (payload: IBook): Promise<IBook> => {
  return Book.create(payload)
}

const getAllBooks = async (
  filterData: IBookFilterableFields,
  paginationData: IPagination,
) => {
  const { searchTerm, ...otherFilters } = filterData

  const condition = []

  // implement dynamic search here
  if (searchTerm) {
    condition.push({
      $or: bookSearchableField.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    })
  }

  // implement dynamic filter here
  if (Object.keys(otherFilters).length) {
    condition.push({
      $and: Object.entries(otherFilters).map(([key, value]) => ({
        [key]: value,
      })),
    })
  }

  // implement dynamic pagination here
  const { page, skip, limit, sortBy, sortOrder } =
    calculatePagination(paginationData)

  // sort condition
  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  // where condition for
  const whereCondition = condition.length ? { $and: condition } : {}

  const result = await Book.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  // total count
  const total = await Book.countDocuments(whereCondition)

  return {
    meta: {
      page,
      total,
      limit,
    },
    data: result,
  }
}

const getMyBooks = async (email: string): Promise<IBook[]> => {
  return await Book.find({ publisher: email })
}

const getSingleBook = async (bookId: string): Promise<IBook | null> => {
  return await Book.findById(bookId)
}

const editBook = async (
  id: string,
  payload: Partial<IBook>,
): Promise<IBook | null> => {
  const book = await Book.findById(id)

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found', '')
  }

  return await Book.findByIdAndUpdate({ _id: id }, payload, { new: true })
}

export const BookService = {
  createBook,
  getAllBooks,
  getMyBooks,
  getSingleBook,
  editBook,
}
