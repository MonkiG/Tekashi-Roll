import { Schema, model } from 'mongoose'
import { type UserDto } from './dto/User.dto'
import Bcrypt from '../helpers/Bcrypt'

const userSchema = new Schema<UserDto>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'client' },
  connected: { type: Boolean, default: false }
},
{
  timestamps: true
})

userSchema.pre('save', async function (next) {
  this.password = await Bcrypt.hashPassword(this.password)
  next()
})

export const User = model('User', userSchema)
