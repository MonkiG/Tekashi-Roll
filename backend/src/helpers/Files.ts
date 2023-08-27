import multer from 'multer'
import path from 'node:path'
import fs from 'node:fs/promises'

export default class Files {
  #folderPath: string
  multerUpload: any

  constructor (folder: string, _file?: string) {
    this.#folderPath = path.join(process.cwd(), folder)
    this.multerUpload = multer({
      storage: multer.diskStorage({
        destination: (_req, _file, cb) => {
          cb(null, this.#folderPath)
        },
        filename: (_req, file, cb) => {
          const uniqueFileName = `${file.originalname}` // Utiliza el nombre proporcionado por el usuario
          cb(null, uniqueFileName)
        }
      }),
      fileFilter: (_req, file, cb) => {
        // Verificar si el archivo es una imagen
        if (file.mimetype.startsWith('image/')) {
          cb(null, true) // Aceptar el archivo
        } else {
          cb(null, false) // Rechazar el archivo
        }
      }
    })
  }

  public static async deleteFile (path: string): Promise<boolean> {
    try {
      await fs.unlink(path)
      return true
    } catch (error) {
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
