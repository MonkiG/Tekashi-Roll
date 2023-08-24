import { type Request, type Response } from 'express'

export default class ProductsControllers {
  public static addProduct (req: Request, res: Response): void {
    console.log(req.file?.path)
    console.log(req.baseUrl)

    res.status(200)
  }

  public static getProducts (_req: Request, _res: Response): void {

  }

  public static getProduct (_req: Request, _res: Response): void {

  }

  public static editProduct (_req: Request, _res: Response): void {

  }

  public static deleteProduct (_req: Request, _res: Response): void {

  }
}
