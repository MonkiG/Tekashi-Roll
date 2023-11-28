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
  verified?: boolean
  readonly connected: boolean = true
  constructor (user?: any) {
    this.name = user.name
    this.email = Utils.parseEmail(user.email)
    this.password = Utils.parsePassword(user.password)
    this.phone = user.phone
    this.role = user.role ?? 'client'
  }

  async #getToken (): Promise<string> {
    const token = await new Jwt(this.email).sign()
    return token
  }

  public async saveUser (): Promise<{ user: User, token: string, data: { rol: string, name: string } }> {
    Utils.parseBasicData(this.name)
    Utils.parseEmail(this.email)
    Utils.parsePassword(this.password)
    Utils.parseBasicData(this.phone)
    Utils.parseBasicData(this.role)

    await this.#hashPassword()

    await new UserSchema(this).save()
    const token = await this.#getToken()
    /* eslint-disable-next-line */
    return { user: this, token, data:{rol: this.role!, name: this.name!} }
  }

  async #hashPassword (): Promise<void> {
    this.password = await Bcrypt.hashPassword(this.password)
  }

  async #comparePassword (hashedPassword: string): Promise<boolean> {
    return await Bcrypt.comparePassword(this.password, hashedPassword)
  }

  public async logUser (): Promise<{ logged: boolean, token: string | null, data: { rol: string, name: string } | null }> {
    const bdUser = await UserServices.findByEmail(this.email, 'password email role name')

    if (bdUser !== null) {
      const parseredPassword = Utils.parsePassword(bdUser.password)
      const isSamePassword = await this.#comparePassword(parseredPassword)

      const token = await this.#getToken()
      /* eslint-disable-next-line */
      return { logged: isSamePassword, token: isSamePassword ? token : null, data: { rol: bdUser.role!, name: bdUser.name! } }
    }

    return { logged: false, token: null, data: null }
  }
}
