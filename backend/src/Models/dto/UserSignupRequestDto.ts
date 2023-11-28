import Utils from '../../helpers/Utils'
import { type role } from '../../types'

export default class UserSignupRequestDto {
  public name
  public phone
  public email
  public password
  public role

  constructor ({
    name,
    phone,
    email,
    password,
    role
  }: {
    name: string
    phone: string | number
    email: string
    password: string
    role: role
  }) {
    this.name = Utils.parseBasicData(name)
    this.phone = Utils.parseBasicData(phone)
    this.email = Utils.parseEmail(email)
    this.password = Utils.parsePassword(password)
    this.role = role ?? 'client'
  }
}
