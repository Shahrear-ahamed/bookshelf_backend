/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export type IUser = {
  email: string
  password: string
  wishlist: Types.ObjectId[]
  currentlyReading: Types.ObjectId[]
  finishedReading: Types.ObjectId[]
}

export type UserModel = {
  isUserExist(email: string): Promise<IUser>
  matchPassword(givenPass: string, hashedPassword: string): Promise<boolean>
} & Model<IUser>
