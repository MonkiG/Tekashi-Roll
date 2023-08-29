import { type Request, type Response } from 'express'
import StatusMessages from '../helpers/StatusMessages'
import { User } from '../Models/dto/User.dto'
import Jwt from '../helpers/Jwt'
import UserServices from '../helpers/UserServices'
import Mail from '../helpers/Nodemailer'

export default class AuthControllers {
  public static main (_req: Request, res: Response): void {
    res.json({ message: 'Main auth route' })
  }

  public static async login (req: Request, res: Response): Promise<void> {
    const { password, email } = req.body

    try {
      const { logged, token } = await new User({ email, password }).logUser()

      if (logged) {
        res.status(200).json({ message: 'Logged correctly', token })
        return
      }

      res.status(401).json({ message: 'Wrong password' })
    } catch (e) {
      res.status(500).json({ message: StatusMessages.STATUS_500 })
    }
  }

  public static async signup (req: Request, res: Response): Promise<void> {
    const { name, phone, email, password, role } = req.body

    try {
      /* TODO
        cambiar logica al User class
      */
      const { token } = await new User({ name, email, password, phone, role }).saveUser()
      const mail = Mail.getInstance()
      const protocol = req.protocol
      /* eslint-disable-next-line */
     const host = process.env.NODE_ENV !== 'production' ? req.get('host')! : req.get('host')!.replace('api.', '')
      const route = `${protocol}://${host}/auth/verify/${token}`
      await mail.sendMail(email, route)

      res.status(201).json({ message: StatusMessages.STATUS_201, token })
    } catch (error) {
      res.status(500).json({ message: StatusMessages.STATUS_500 })
    }
  }

  public static async verify (req: Request, res: Response): Promise<void> {
    const { token } = req.params
    if (token === undefined) {
      res.status(400).json({ message: `${StatusMessages.STATUS_400}, Should provide an auth token in the path params` })
      return
    }
    const protocol = req.protocol
    /* eslint-disable-next-line */
    const host = process.env.NODE_ENV !== 'production' ? req.get('host')! : req.get('host')!.replace('api.', '')
    const route = `${protocol}://${host}/`

    const email = Jwt.checkTokenAndExtractEmail(token)
    const user = await UserServices.findByObjectAndUpdate({ email, verified: false }, { verified: true })

    if (user !== null) {
      res.redirect(route)
      return
    }

    res.status(404).redirect(route)
  }

  public static methodNotAllowed (req: Request, res: Response): void {
    const endpoint = req.path
    res.status(405).json({ message: `Method Not Allowed for ${endpoint}` })
  }
}
