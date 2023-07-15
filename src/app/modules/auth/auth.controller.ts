import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { AuthService } from './auth.service'

const authSignUp = catchAsync(async (req, res) => {
  const userData = req.body

  const result = await AuthService.authSignUp(userData)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    status: true,
    message: 'User created successfully',
    data: result,
  })
})

const authLogin = catchAsync(async (req, res) => {
  const userData = req.body

  const result = await AuthService.authLogin(userData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'User logged in successfully',
    data: result,
  })
})

export const AuthController = {
  authSignUp,
  authLogin,
}
