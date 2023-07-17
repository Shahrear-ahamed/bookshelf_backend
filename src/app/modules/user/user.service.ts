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

const addReadingList = async (email: string, payload: IReadingList) => {
  const { bookId, status } = payload
  const id = new mongoose.Types.ObjectId(bookId)
  const bookData = { bookId: id, status }

  const isUserExist = await User.findOne({ email })

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found', '')
  }

  // check if bookId is already in reading list
  const isBookExist = isUserExist.readingList.find(
    book => book.bookId.toString() === id.toString(),
  )
  console.log(isBookExist)

  if (isBookExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Book already in reading list', '')
  }

  return await User.findOneAndUpdate(
    { email },
    { $push: { readingList: bookData } },
    { new: true },
  )
}

export const UserService = {
  addWishlist,
  addReadingList,
}
