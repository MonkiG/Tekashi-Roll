import { type NextFunction, type Request, type Response } from 'express'
import UserServices from '../helpers/UserServices'
import StatusMessages from '../helpers/StatusMessages'

export default class AuthMiddlewares {
  public static async isRegistered (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email } = req.body

    try {
      const user = await UserServices.findByEmail(email)
      if (req.path === '/signup') {
        if (user === null) {
          next()
          return
        }
        res.status(409).json({ message: StatusMessages.STATUS_409, user })
        return
      }

      if (req.path === '/login') {
        if (user !== null) {
          next()
          return
        }
        res.status(404).json({ message: `${StatusMessages.STATUS_401}, user is not registered` })
      }
    } catch (error) {
      res.status(500).json({ message: StatusMessages.STATUS_500 })
    }
  }
}
