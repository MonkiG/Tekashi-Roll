import { type Document } from 'mongoose'
import { type User } from '../Models/dto/User.dto'
import { UserSchema } from '../Models/User.model'
// import Jwt from '../helpers/Jwt'

export default class UserServices {
  public static async findByEmail (email: string, dataToReturn: string = '_id email createdAt'): Promise<User | null> {
    return await UserSchema.findOne({ email }, dataToReturn)
  }

  public static async findByObjectAndUpdate (object: any, dataToUpdate: any): Promise<Document | null> {
    return await UserSchema.findOneAndUpdate(object, { $set: dataToUpdate }, { new: true })
  }

  // public static async logUser ({ email, password }: { email: string, password: string }): Promise<{ logged: boolean, token: string | null }> {
  //   Utils.parseBasicData(email)
  //   Utils.parseBasicData(password)
  //   const user = await UserServices.findByEmail(email, 'password')
  //   if (user !== null) {
  //     const isSamePassword = await user.comparePassword(user.password)
  //     const token = user.getToken()
  //     return { logged: isSamePassword, token: isSamePassword ? token : null }
  //   }

  //   return { logged: false, token: null }
  // }

  // public static async createUser ({ name, email, password, phone, role }: any): Promise<{ user: User, token: string }> {
  //   const user = {
  //     name: Utils.parseBasicData(name),
  //     email: Utils.parseEmail(email),
  //     password: Utils.parseBasicData(password),
  //     phone: Utils.parseBasicData(phone),
  //     role: (role !== null && role !== undefined) ? Utils.parseRol(role) : 'client'
  //   }
  //   const userSaved = await new User(user).saveUser()
  //   const token = new Jwt(user.email).sign()
  //   return { user: userSaved, token }
  // }
}
