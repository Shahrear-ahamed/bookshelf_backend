import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import config from '../../../config'
import { IUser, UserModel } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password
      },
    },
  },
)

// statics are use
userSchema.statics.isUserExist = async function (
  email: string,
): Promise<IUser> {
  return await this.findOne({ email }).select('+password')
}

userSchema.statics.matchPassword = async function (
  givenPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, hashedPassword)
}

// hash password
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_round))

  next()
})

const User = model<IUser, UserModel>('User', userSchema)

export default User
