import { Schema, model } from 'mongoose'
import { BookModel, IBook } from './book.interface'

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  publicationDate: {
    type: Date,
    trim: true,
    default: Date.now,
  },
})

const Book = model<IBook, BookModel>('Book', bookSchema)

export default Book
