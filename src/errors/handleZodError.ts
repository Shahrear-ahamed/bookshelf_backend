import { ZodError, ZodIssue } from 'zod'
import { IGenericErrorResponse } from '../interfaces/common'
import httpStatus from 'http-status'
import { IGenericErrorMessage } from '../interfaces/error'

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const statusCode = httpStatus.BAD_REQUEST

  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path.length - 1],
      message: issue.message,
    }
  })

  return {
    statusCode,
    message: 'Cast error',
    errorMessages: errors,
  }
}

export default handleZodError
