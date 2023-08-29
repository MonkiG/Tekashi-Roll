import nodemailer from 'nodemailer'
import Utils from './Utils'
import config from '../config'

interface MailOptions {
  from: string
  to: string
  subject: string
  text?: string
  html?: string
  date: Date
}

export default class Mail {
  static #instance: Mail
  #transporter: nodemailer.Transporter

  constructor () {
    this.#transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        // Cambiar esto al .env
        user: config.NODEMAILER_AUTH_MAIL,
        pass: config.NODEMAILER_AUTH_PASS
      }
    })
  }

  public static getInstance (): Mail {
    if (Mail.#instance === null || Mail.#instance === undefined) {
      Mail.#instance = new Mail()
    }

    return Mail.#instance
  }

  public async sendMail (receiverMail: string, route: string): Promise<void> {
    const mailOptions: MailOptions = {
      from: config.NODEMAILER_AUTH_MAIL as string,
      to: Utils.parseBasicData(receiverMail),
      subject: 'Email validation',
      html: `<a href='${route}' target='_blank' rel='noopener noreferrer'>Click aqui para validar correo!</a>`,
      date: new Date()
    }

    console.log(mailOptions)

    await this.#transporter.sendMail(mailOptions)
    console.log('Sent')
  }
}
