import httpStatus from 'http-status'
import mongoose from 'mongoose'
import { IGenericErrorResponse } from '../interfaces/common'
import { IGenericErrorMessage } from '../interfaces/error'

const handleValidationError = (
  error: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const statusCode = httpStatus.BAD_REQUEST

  const errors: IGenericErrorMessage[] = Object.values(error?.errors).map(
    (elem: unknown) => {
      const error = elem as mongoose.Error.ValidatorError
      return {
        path: error.path,
        message: error.message,
      }
    },
  )

  return {
    statusCode,
    message: 'Validation error',
    errorMessages: errors,
  }
}

export default handleValidationError
