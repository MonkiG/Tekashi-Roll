import { type Document } from 'mongoose'
import { UserSchema } from '../Models/User.model'
import UserLoginResponseDto from '../Models/dto/UserLoginResponseDto'
import type UserLoginRequestDto from '../Models/dto/UserLoginRequestDto'
import Bcrypt from './Bcrypt'
import Jwt from './Jwt'
import type UserSignupRequestDto from '../Models/dto/UserSignupRequestDto'
import type UserSignupResponsetDto from '../Models/dto/UserSignupResponseDto'
// import Jwt from '../helpers/Jwt'

export interface logUserDto {
  logged: boolean
  token: string | null
  data: UserLoginResponseDto | null
}

export interface saveUserReturn {
  token: string
  data: UserSignupResponsetDto
}

export default class UserServices {
  public static async saveUser (userSignup: UserSignupRequestDto): Promise<saveUserReturn> {
    const hashedPassword = await Bcrypt.hashPassword(userSignup.password)
    const userSaved = await new UserSchema({ ...userSignup, password: hashedPassword }).save()
    const token = await new Jwt(userSignup.email).sign()

    if (userSaved !== null) {
      return {
        token,
        data: {
          _id: userSaved._id,
          name: userSaved.name,
          phone: userSaved.phone,
          email: userSaved.email
        }
      }
    }

    throw new Error('Error saving user')
  }

  public static async logUser ({
    email,
    password
  }: {
    email: string
    password: string
  }): Promise<logUserDto | { logged: boolean }> {
    const bdUser = await UserServices.findByEmail(email, '_id name phone email pasword role verified') as UserLoginResponseDto

    if (bdUser !== null) {
      const userLoginResponseDto = new UserLoginResponseDto(bdUser)
      const isSamePassword = await Bcrypt.comparePassword(password, bdUser.password)
      const token = await new Jwt(email).sign()

      return {
        logged: isSamePassword,
        token,
        data: userLoginResponseDto
      }
    }

    return {
      logged: false
    }
  }

  public static async findByEmail (email: string, dataToReturn: string = '_id email createdAt'): Promise<UserLoginResponseDto | UserLoginRequestDto> {
    const query = await UserSchema.findOne({ email }, dataToReturn)
    if (query === null) throw new Error('Query not found')

    return query
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
