import jwt, { JwtPayload } from 'jsonwebtoken'

type IPayload = {
  email: string
}

const createToken = (
  payload: IPayload,
  secret: string,
  expired: string,
): string => {
  const option = { expiresIn: expired }

  return jwt.sign(payload, secret, option)
}

const verifyToken = (payload: string, secret: string): JwtPayload => {
  return jwt.verify(payload, secret) as JwtPayload
}

export const JwtHelpers = { createToken, verifyToken }
