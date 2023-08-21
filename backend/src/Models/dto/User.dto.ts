import { type role } from '../../types'

export interface UserDto {
  password: string
  name: string
  phone: string
  email: string
  role?: role
  connected?: boolean
  readonly createdAt: Date
  readonly updatedAt: Date
}
