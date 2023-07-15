import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import config from '../../../config'
import ApiError from '../../../errors/ApiErrors'
import { JwtHelpers } from '../../../helpers/JwtHelpers'
import { IUser } from '../user/user.interface'
import User from '../user/user.model'

const authSignUp = async (payload: IUser) => {
  return await User.create(payload)
}

const authLogin = async (payload: IUser) => {
  const { email, password } = payload

  const isExist = await User.findOne({ email }).select('+password')

  console.log(isExist)

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

  const userDetails = {
    email: isExist.email,
  }

  const accessToken = await JwtHelpers.createToken(
    userDetails,
    config.jwt_secret as string,
    config.jwt_expired as string,
  )

  const refreshToken = await JwtHelpers.createToken(
    userDetails,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expired as string,
  )

  return { accessToken, refreshToken }
}

export const AuthService = {
  authSignUp,
  authLogin,
}
