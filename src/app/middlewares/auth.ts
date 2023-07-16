import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import config from '../../config'
import ApiError from '../../errors/ApiErrors'
import { JwtHelpers } from '../../helpers/JwtHelpers'

const auth: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1]

    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized', '')
    }

    // verify token
    let verifiedUser = null
    verifiedUser = await JwtHelpers.verifyToken(
      token,
      config.jwt_secret as string,
    )

    req.user = verifiedUser

    next()
  } catch (error) {
    next(error)
  }
}

export default auth
