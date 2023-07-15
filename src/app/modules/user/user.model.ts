import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import config from '../../../config'
import { IUser, UserModel } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

// hash password
userSchema.pre<IUser>('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_round))

  next()
})

const User = model<IUser, UserModel>('User', userSchema)

export default User
