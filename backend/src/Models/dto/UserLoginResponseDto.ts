import { type ObjectId } from 'mongoose'
import { type role } from '../../types'

export default class UserLoginResponseDto {
  public _id
  public name
  public phone
  public email
  public password
  public role
  public verified
  public connected

  constructor ({
    _id,
    name,
    phone,
    email,
    password,
    role,
    verified,
    connected
  }: {
    _id: ObjectId | string
    name: string
    phone: string | number
    email: string
    password: string
    role: string | role
    verified: boolean
    connected: boolean
  }) {
    this._id = _id
    this.name = name
    this.phone = phone
    this.email = email
    this.password = password
    this.role = role
    this.verified = verified
    this.connected = connected
  }
}
