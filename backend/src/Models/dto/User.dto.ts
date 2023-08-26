import { type role } from '../../types'
import Jwt from './../../helpers/Jwt'
import { UserSchema } from '../User.model'
import Utils from '../../helpers/Utils'
import UserServices from '../../helpers/UserServices'
import Bcrypt from '../../helpers/Bcrypt'

export interface UserDto {
  id: string
  password: string
  name: string
  phone: string
  email: string
  role: role
  connected: boolean
  readonly createdAt: Date
  readonly updatedAt: Date
}

export class User {
  password: string
  name?: string = undefined
  phone?: string = undefined
  email: string
  role?: role
  readonly connected: boolean = true
  constructor (user?: any) {
    this.name = user.name
    this.email = Utils.parseEmail(user.email)
    this.password = Utils.parseBasicData(user.password)
    this.phone = user.phone
    this.role = user.role ?? 'client'
  }

  #getToken (): string {
    return new Jwt(this.email).sign()
  }

  public async saveUser (): Promise<{ user: User, token: string }> {
    Utils.parseBasicData(this.name)
    Utils.parseEmail(this.email)
    Utils.parseBasicData(this.password)
    Utils.parseBasicData(this.phone)
    Utils.parseBasicData(this.role)

    await this.hashPassword()
    const token = this.#getToken()
    await new UserSchema(this).save()
    return { user: this, token }
  }

  public async hashPassword (): Promise<void> {
    this.password = await Bcrypt.hashPassword(this.password)
  }

  public async comparePassword (hashedPassword: string): Promise<boolean> {
    return await Bcrypt.comparePassword(this.password, hashedPassword)
  }

  public async logUser (): Promise<{ logged: boolean, token: string | null }> {
    const bdUser = await UserServices.findByEmail(this.email, 'password email')

    if (bdUser !== null) {
      const isSamePassword = await this.comparePassword(bdUser.password)

      const token = this.#getToken()
      return { logged: isSamePassword, token: isSamePassword ? token : null }
    }

    return { logged: false, token: null }
  }
}
