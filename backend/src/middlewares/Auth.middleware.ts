import { type NextFunction, type Request, type Response } from 'express'
import UserServices from '../helpers/UserServices'
import StatusMessages from '../helpers/StatusMessages'
import Jwt from '../helpers/Jwt'
import { isValidObjectId } from 'mongoose'

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
        res.status(404).json({ message: `${StatusMessages.STATUS_404}, user is not registered` })
      }
    } catch (error) {
      res.status(500).json({ message: StatusMessages.STATUS_500 })
    }
  }

  public static async isAdmin (req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.headers.authorization

    const email = Jwt.checkTokenAndExtractEmail(token)
    try {
      const user = await UserServices.findByEmail(email, 'role')
      if (user !== null) {
        if (user.role === 'admin') {
          next()
          return
        }

        if (user.role === 'client') {
          res.status(401).json({ message: `${StatusMessages.STATUS_401}, user doesn't have authorization, should be "Admin" but it's ${user.role}` })
          return
        }
      }
      res.status(404).json({ message: `${StatusMessages.STATUS_404}, User not found` })
    } catch (error) {
      res.status(500).json({ message: StatusMessages.STATUS_500 })
    }
  }

  public static async isValidId (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id: bodyId } = req.body
    const { id: paramsId } = req.params

    if ((bodyId !== undefined && isValidObjectId(bodyId)) || (paramsId !== undefined && isValidObjectId(paramsId))) {
      next()
      return
    }

    res.status(400).json({ message: `${StatusMessages.STATUS_400}, Should be a valid ObjectId` })
  }

  public static isValidToken (req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization
    if (token === undefined) {
      res.status(400).json({ message: `${StatusMessages.STATUS_400}, Token undefined` })
      return
    }

    const isValidToken = token.toLocaleLowerCase().startsWith('bearer')
    if (isValidToken) {
      const authToken = token.split(' ')[1]
      req.headers.authorization = authToken
      next()
      return
    }

    res.status(400).json({ message: `${StatusMessages.STATUS_400}, 'Invalid token format. Use Bearer scheme.` })
  }
}
