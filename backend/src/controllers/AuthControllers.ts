import { type Request, type Response } from 'express'
import StatusMessages from '../helpers/StatusMessages'
import { User } from '../Models/dto/User.dto'

export default class AuthControllers {
  public static main (_req: Request, res: Response): void {
    res.json({ message: 'Main auth route' })
  }

  public static async login (req: Request, res: Response): Promise<void> {
    const { password, email } = req.body

    const { logged, token } = await new User({ email, password }).logUser()

    if (logged) {
      res.status(200).json({ message: 'Logged correctly', token })
      return
    }

    res.status(401).json({ message: 'Wrong password' })
  }

  public static async signup (req: Request, res: Response): Promise<void> {
    const { name, phone, email, password } = req.body
    try {
      const user = await new User({ name, email, password, phone }).saveUser()
      const token = user.getToken()

      res.status(201).json({ message: StatusMessages.STATUS_201, token })
    } catch (error) {
      res.status(500).json({ message: StatusMessages.STATUS_500 })
    }
  }

  public static methodNotAllowed (req: Request, res: Response): void {
    const endpoint = req.path
    res.status(405).json({ message: `Method Not Allowed for ${endpoint}` })
  }
}
