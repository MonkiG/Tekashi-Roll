import { Schema, model } from 'mongoose'
import { type User } from './dto/User.dto'

const userSchema = new Schema<User>({
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

export const UserSchema = model('User', userSchema)
