import { type NextFunction, type Request, type Response } from 'express'
import StatusMessages from '../helpers/StatusMessages'
import Files from '../helpers/Files'
export default class FileMiddlewares {
  public static async isImage (req: Request, res: Response, next: NextFunction): Promise<void> {
    const file = req.file

    if (file === undefined) {
      res.status(400).json({ message: `${StatusMessages.STATUS_400}, Image don't provided` })
      return
    }

    const fileName = file.filename
    const isImage = file.mimetype.startsWith('image')

    if (isImage) {
      if (await Files.fileExist(`/static/products/${fileName}`)) {
        req.body.fileName = fileName
        next()
        return
      }

      res.status(500).json({ message: `${StatusMessages.STATUS_500}, Error saving image, try later` })
      return
    }

    res.status(400).json({ message: `${StatusMessages.STATUS_400}, file should be an image` })
  }
}
