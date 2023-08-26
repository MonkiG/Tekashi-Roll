import { type NextFunction, type Request, type Response } from 'express'
import UserServices from '../helpers/UserServices'
import StatusMessages from '../helpers/StatusMessages'
import Jwt from '../helpers/Jwt'

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

  public static async isAdmin (req: Request, res: Response, next: NextFunction): Promise<void> {
    /* get role using token desencription getting headers token */
    const correctToken = req.headers.authorization?.toLocaleLowerCase().startsWith('bearer')
    const tokenAuth = req.headers.authorization?.split(' ')[1]

    if (correctToken === true && tokenAuth !== undefined) {
      const email = Jwt.checkTokenAndExtractEmail(tokenAuth)
      try {
        const user = await UserServices.findByEmail(email, 'role')
        if (user !== null && user.role === 'admin') {
          next()
          return
        }

        if (user !== null && user.role === 'client') {
          res.status(401).json({ message: `${StatusMessages.STATUS_401}, user doesn't have authorization, should be "Admin" but it's ${user.role}` })
          return
        }

        res.status(401).json({ message: `${StatusMessages.STATUS_401}, user doesn't have authorization` })
      } catch (error) {

      }
    }
  }
}
