import httpStatus from 'http-status'
import mongoose from 'mongoose'
import ApiError from '../../../errors/ApiErrors'
import { IReadingList } from './user.interface'
import User from './user.model'

const addWishlist = async (email: string, bookId: string) => {
  // find user by email and push bookId to wishlist
  const user = await User.findOne({ email })
  const wishlist = user?.wishlist

  const objectIdBookId = new mongoose.Types.ObjectId(bookId)

  if (wishlist?.includes(objectIdBookId)) {
    throw new ApiError(httpStatus.CONFLICT, 'Book already in wishlist', '')
  }

  return await User.findOneAndUpdate(
    { email },
    { $push: { wishlist: bookId } },
    { new: true },
  ).select(
    '-password -email -createdAt -updatedAt -currentlyReading -finishedReading',
  )
}

const getReadingList = async (email: string) => {
  const user = await User.findOne({ email })
    .select('-password -email -createdAt -updatedAt -wishlist')
    .populate('readingList.book', '-reviews -createdAt -updatedAt -__v')

  return user?.readingList
}

const addReadingList = async (email: string, payload: IReadingList) => {
  const { book: id, status } = payload
  const bookData = { book: id, status }

  const isUserExist = await User.findOne({ email })

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found', '')
  }

  // check if bookId is already in reading list
  const isBookExist = isUserExist.readingList.find(
    book => book.book.toString() === id.toString(),
  )

  if (isBookExist && isBookExist.status === status) {
    throw new ApiError(httpStatus.CONFLICT, 'Book already in reading list', '')
  }

  return await User.findOneAndUpdate(
    { email },
    { $push: { readingList: bookData } },
    { new: true },
  )
}

const finishedReading = async (email: string, payload: IReadingList) => {
  const { book: id, status } = payload

  const isUserExist = await User.findOne({ email })

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found', '')
  }

  // check if bookId is already in reading list
  const isBookExist = isUserExist.readingList.find(
    book => book.book.toString() === id.toString(),
  )

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found', '')
  }

  if (isBookExist && isBookExist.status === status) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Book already marked as finished',
      '',
    )
  }

  return await User.findOneAndUpdate(
    { email, 'readingList.book': id },
    { $set: { 'readingList.$.status': status } },
    { new: true },
  )
}

export const UserService = {
  addWishlist,
  getReadingList,
  addReadingList,
  finishedReading,
}
