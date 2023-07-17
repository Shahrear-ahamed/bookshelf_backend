/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export type IReadingList = {
  bookId: Types.ObjectId
  status: string
}

export type IUser = {
  email: string
  password: string
  wishlist: Types.ObjectId[]
  readingList: IReadingList[]
}

export type UserModel = {
  isUserExist(email: string): Promise<IUser>
  matchPassword(givenPass: string, hashedPassword: string): Promise<boolean>
} & Model<IUser>
