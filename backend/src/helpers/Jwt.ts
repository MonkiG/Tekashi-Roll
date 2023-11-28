import config from './../config'
import jwt from 'jsonwebtoken'
import UserServices from './UserServices'

export default class Jwt {
  #email: string
  constructor (email: string) {
    this.#email = email
  }

  public static verify (token: string): string | jwt.JwtPayload {
    const payload = jwt.verify(token, config.JWT_SECRET)
    return payload
  }

  public static checkTokenAndExtractEmail (tokenAuth: string | undefined): any {
    if (tokenAuth !== undefined) {
      const payload = Jwt.verify(tokenAuth)

      if (typeof payload === 'string') {
        console.error('El token no pudo ser verificado:', payload)
      } else {
        const { email } = payload
        return email
      }
    }
  }

  public async sign (): Promise<string> {
    try {
      const payload = await this.#payload()
      const token = jwt.sign(payload, config.JWT_SECRET)
      return token
    } catch (e) {
      throw new Error('Error en la firma')
    }
  }

  async #payload (): Promise<object> {
    console.log(this.#email)

    const request = await UserServices.findByEmail(this.#email, 'role name')
    console.log(request)

    if (request === null) throw new Error('User dont found')
    const payload = {
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 7 * 31),
      sub: 'Auth token',
      email: this.#email,
      rol: request.role,
      name: request.name
    }
    return payload
  }
}
