import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiErrors'
import { IUser } from '../user/user.interface'
import User from '../user/user.model'

const authSignUp = async (payload: IUser) => {
  const result = await User.create(payload)

  return result
}

const authLogin = async (payload: IUser) => {
  const { email, password } = payload

  const isExist = await User.findOne({ email }).select('+password')

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found', '')
  }

  const passMatch = await bcrypt.compare(password, isExist.password)

  if (!passMatch) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Email and Password are wrong',
      '',
    )
  }

  return isExist.email
}

export const AuthService = {
  authSignUp,
  authLogin,
}
