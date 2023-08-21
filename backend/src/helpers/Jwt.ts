import config from './../config'
import jwt from 'jsonwebtoken'

export default class Jwt {
  #email: string
  constructor (email: string) {
    this.#email = email
  }

  public sign (): string {
    const payload = this.#payload()
    const token = jwt.sign(payload, config.JWT_SECRET)

    return token
  }

  #payload (): object {
    const payload = {
      exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60),
      sub: 'Auth token',
      email: this.#email
    }
    return payload
  }
}
