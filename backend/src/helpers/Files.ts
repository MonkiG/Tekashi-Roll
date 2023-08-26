import multer from 'multer'
import path from 'node:path'
import fs from 'node:fs/promises'

export default class Files {
  #folderPath: string
  #file: string
  #fullPath: string
  multerUpload: any

  constructor (folder: string, file?: string) {
    this.#folderPath = path.join(process.cwd(), folder)
    this.#file = file ?? ''
    this.#fullPath = path.join(this.#folderPath, this.#file)
    this.multerUpload = multer({
      storage: multer.diskStorage({
        destination: (_req, _file, cb) => {
          cb(null, this.#folderPath)
        },
        filename: (_req, file, cb) => {
          const uniqueFileName = `${file.originalname}` // Utiliza el nombre proporcionado por el usuario
          cb(null, uniqueFileName)
        }
      })
    })
  }

  public static async deleteFile (path: string): Promise<boolean> {
    try {
      await fs.unlink(path)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  public static joinRoutes (route1: string, route2: string): string {
    return path.join(route1, route2)
  }

  public static async fileExist (fileRoute: string): Promise<boolean> {
    try {
      await fs.access(path.join(process.cwd(), fileRoute))
      return true
    } catch (error) {
      return false
    }
  }
}
