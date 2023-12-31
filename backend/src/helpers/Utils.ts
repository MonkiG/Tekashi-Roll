import { type ObjectId, isValidObjectId } from 'mongoose'
import { type role } from '../types'
import { ParseErrors } from './Errors'

export default class Utils {
  public static parseBasicData (data: any): string {
    if (data === undefined || data === null) {
      throw new ParseErrors('Data don\'t provided')
    }
    if (!this.isString(data)) {
      throw new ParseErrors('Data sent it\'s not a string')
    }

    return data
  }

  public static parsePassword (data: any): string {
    const regex = /^(?=.*\d).{8,}$/

    if (!this.isString(data)) throw new ParseErrors('Wrong data format')

    if (!regex.test(data)) throw new ParseErrors('Invalid password format, should have 8 digits, minimum one number')

    return data
  }

  public static parseEmail (data: any): string {
    if (data === undefined || data === null) {
      throw new ParseErrors('Data don\'t provided')
    }

    if (!this.isEmail(data)) {
      throw new ParseErrors('Data sent it\'s not email')
    }
    return data
  }

  public static parseRol (role: any): role {
    const rolToLower = role.toLocaleLowerCase() as string
    if (this.isString(rolToLower) && (rolToLower !== 'client' && rolToLower !== 'admin')) {
      throw new ParseErrors('Wrong role')
    }

    return role
  }

  public static parseObjectId (id: any): ObjectId {
    if (!isValidObjectId(id)) {
      throw new ParseErrors('Id it\'s not an ObjectId')
    }

    return id
  }

  public static isNumber (data: any): boolean {
    return !isNaN(data)
  }

  public static isEmail (data: any): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(data)
  }

  public static isString (data: any): boolean {
    return (typeof data === 'string' || data instanceof String)
  }
}
