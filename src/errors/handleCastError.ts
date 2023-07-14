import httpStatus from 'http-status'
import mongoose from 'mongoose'
import { IGenericErrorResponse } from '../interfaces/common'
import { IGenericErrorMessage } from '../interfaces/error'

const handleCastError = (
  error: mongoose.Error.CastError,
): IGenericErrorResponse => {
  const statusCode = httpStatus.BAD_REQUEST

  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid id',
    },
  ]

  return {
    statusCode,
    message: 'Cast error',
    errorMessages: errors,
  }
}

export default handleCastError
