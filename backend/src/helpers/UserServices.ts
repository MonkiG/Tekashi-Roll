import { type UserDto } from '../Models/dto/User.dto'
import { User } from '../Models/User.model'
import Jwt from '../helpers/Jwt'
import Utils from './Utils'
import Bcrypt from './Bcrypt'

export default class UserServices {
  public static async findByEmail (email: string, dataToReturn: string = '_id email createdAt'): Promise<UserDto | null> {
    return await User.findOne({ email }, dataToReturn)
  }

  public static async logUser ({ email, password }: { email: string, password: string }): Promise<{ logged: boolean, token: string | null }> {
    Utils.parseBasicData(email)
    Utils.parseBasicData(password)
    const user = await UserServices.findByEmail(email, 'password')
    if (user !== null) {
      const isSamePassword = await Bcrypt.comparePassword(password, user.password)
      const token = new Jwt(email).sign()
      return { logged: isSamePassword, token: isSamePassword ? token : null }
    }

    return { logged: false, token: null }
  }

  public static async createUser ({ name, email, password, phone, role }: any): Promise<{ user: UserDto, token: string }> {
    const user = {
      name: Utils.parseBasicData(name),
      email: Utils.parseEmail(email),
      password: Utils.parseBasicData(password),
      phone: Utils.parseBasicData(phone),
      role: (role !== null && role !== undefined) ? Utils.parseRol(role) : 'client'
    }
    const userSaved = await new User(user).save()
    const token = new Jwt(user.email).sign()
    return { user: userSaved, token }
  }
}
