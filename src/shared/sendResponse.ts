import { Response } from 'express'

type IResponseData<T> = {
  statusCode: number
  status: boolean
  message: string | null
  meta?: {
    total: number
    page: number
    limit: number
  }
  data?: T | null
}

const sendResponse = <T>(res: Response, data: IResponseData<T>) => {
  const responseData: IResponseData<T> = {
    statusCode: data.statusCode,
    status: data.status,
    message: data.message || null,
    meta: data.meta || undefined,
    data: data.data || null,
  }

  res.status(data.statusCode).json(responseData)
}

export default sendResponse
