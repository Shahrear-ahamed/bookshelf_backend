import httpStatus from 'http-status'
import mongoose from 'mongoose'
import ApiError from '../../../errors/ApiErrors'
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

export const UserService = {
  addWishlist,
}
