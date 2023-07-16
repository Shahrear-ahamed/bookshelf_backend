import { Model } from 'mongoose'

export type IBook = {
  title: string
  author: string
  genre: string
  publicationDate: number
  publisher: string
}

export type IBookFilterableFields = {
  searchTerm?: string
  title?: string
  author?: string
  genre?: string
}

export type BookModel = Model<IBook>
