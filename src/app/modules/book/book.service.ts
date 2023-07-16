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
  console.log(searchTerm, otherFilters, paginationData)

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

  // where condition for
  const whereCondition = condition.length ? { $and: condition } : {}

  const result = await Book.find(whereCondition)
    .sort({ createdAt: -1 })
    .skip(0)
    .limit(10)
  return {
    meta: {
      page: 0,
      total: 10,
      limit: 10,
    },
    data: result,
  }
}

export const BookService = {
  createBook,
  getAllBooks,
}
