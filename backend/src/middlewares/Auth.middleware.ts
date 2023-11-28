import { type NextFunction, type Request, type Response } from 'express'
import UserServices from '../helpers/UserServices'
import StatusMessages from '../helpers/StatusMessages'
import Jwt from '../helpers/Jwt'
import { isValidObjectId } from 'mongoose'
import ResponseDto from '../Models/dto/ResponseDto'

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

        const response = new ResponseDto({ message: StatusMessages.STATUS_409, data: user })
        res.status(409).json(response)
        return
      }

      if (req.path === '/login') {
        if (user !== null) {
          next()
          return
        }

        const response = new ResponseDto({ message: `${StatusMessages.STATUS_404}, user is not registered` })
        res.status(404).json(response)
      }
    } catch (error) {
      const response = new ResponseDto({ message: StatusMessages.STATUS_500 })
      res.status(500).json(response)
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
          const response = new ResponseDto({ message: `${StatusMessages.STATUS_401}, user doesn't have authorization, should be "Admin" but it's ${user.role}` })
          res.status(401).json(response)
          return
        }
      }
      const response = new ResponseDto({ message: `${StatusMessages.STATUS_404}, User not found` })
      res.status(404).json(response)
    } catch (error) {
      const response = new ResponseDto({ message: StatusMessages.STATUS_500 })
      res.status(500).json(response)
    }
  }

  public static async isValidId (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id: bodyId } = req.body
    const { id: paramsId } = req.params

    if ((bodyId !== undefined && isValidObjectId(bodyId)) || (paramsId !== undefined && isValidObjectId(paramsId))) {
      next()
      return
    }

    const response = new ResponseDto({ message: `${StatusMessages.STATUS_400}, Should be a valid ObjectId` })
    res.status(400).json(response)
  }

  public static isValidToken (req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization
    if (token === undefined) {
      const response = new ResponseDto({ message: `${StatusMessages.STATUS_400}, Token undefined` })
      res.status(400).json(response)
      return
    }

    const isValidToken = token.toLocaleLowerCase().startsWith('bearer')
    if (isValidToken) {
      const authToken = token.split(' ')[1]
      req.headers.authorization = authToken
      next()
      return
    }

    const response = new ResponseDto({ message: `${StatusMessages.STATUS_400}, 'Invalid token format. Use Bearer scheme.` })
    res.status(400).json(response)
  }
}
