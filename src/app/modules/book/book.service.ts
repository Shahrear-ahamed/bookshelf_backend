import { SortOrder } from 'mongoose'
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

export const BookService = {
  createBook,
  getAllBooks,
}
