import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { UserService } from './user.service'

const addWishlist = catchAsync(async (req, res) => {
  const { bookId } = req.body
  const user = req.user

  const result = await UserService.addWishlist(user?.email, bookId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Add book in wishlist successfully',
    data: result,
  })
})

const addReadingList = catchAsync(async (req, res) => {
  const bookData = req.body
  const user = req.user

  const result = await UserService.addReadingList(user?.email, bookData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Add book in reading list successfully',
    data: result,
  })
})

export const UserController = {
  addWishlist,
  addReadingList,
}
