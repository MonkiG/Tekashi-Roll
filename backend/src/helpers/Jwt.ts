import config from './../config'
import jwt from 'jsonwebtoken'

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

  public sign (): string {
    const payload = this.#payload()
    const token = jwt.sign(payload, config.JWT_SECRET)

    return token
  }

  #payload (): object {
    const payload = {
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 7 * 31),
      sub: 'Auth token',
      email: this.#email
    }
    return payload
  }
}
