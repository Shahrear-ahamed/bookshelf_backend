import httpStatus from 'http-status'
import config from '../../../config'
import ApiError from '../../../errors/ApiErrors'
import { JwtHelpers } from '../../../helpers/JwtHelpers'
import { IUser } from '../user/user.interface'
import User from '../user/user.model'

const authSignUp = async (payload: IUser) => {
  const user = await User.create(payload)

  const userDetails = {
    email: user.email,
  }

  const accessToken = await JwtHelpers.createToken(
    userDetails,
    config.jwt_secret as string,
    config.jwt_expired as string,
  )

  return { ...userDetails, accessToken }
}

const authLogin = async (payload: IUser) => {
  const { email, password } = payload

  const isUserExist = await User.isUserExist(email)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found', '')
  }

  const passMatch = await User.matchPassword(password, isUserExist.password)

  if (!passMatch) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Email and Password are wrong',
      '',
    )
  }

  const userDetails = {
    email: isUserExist.email,
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

  return { ...userDetails, accessToken, refreshToken }
}

export const AuthService = {
  authSignUp,
  authLogin,
}
