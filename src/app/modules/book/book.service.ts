import { IBook } from './book.interface'
import Book from './book.model'

const createBook = (payload: IBook): Promise<IBook> => {
  return Book.create(payload)
}

export const BookService = {
  createBook,
}
