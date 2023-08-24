import multer from 'multer'
import path from 'node:path'

export default class Multer {
  public path: string
  public upload

  constructor (folder: string) {
    this.path = path.join(process.cwd(), folder)
    this.upload = multer({
      storage: multer.diskStorage({
        destination: (_req, _file, cb) => {
          cb(null, this.path)
        },
        filename: (_req, file, cb) => {
          const uniqueFileName = `${file.originalname as string}` // Utiliza el nombre proporcionado por el usuario
          cb(null, uniqueFileName)
        }
      })
    })
  }
}
