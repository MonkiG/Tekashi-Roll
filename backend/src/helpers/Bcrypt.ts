import bcrypt from 'bcrypt'

export default class Bcrypt {
  static #saltRounds = 10

  public static async hashPassword (plainPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.#saltRounds)
    const hashedPassword = await bcrypt.hash(plainPassword, salt)
    return hashedPassword
  }

  public static async comparePassword (plainPassword: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hash)
  }
}
