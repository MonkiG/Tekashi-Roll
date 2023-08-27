import { type Request, type Response } from 'express'
import Files from '../helpers/Files'
import { Product } from '../Models/dto/Product.dto'
import ProductServices from '../helpers/ProductServices'
import StatusMessages from '../helpers/StatusMessages'

export default class ProductsControllers {
  public static async addProduct (req: Request, res: Response): Promise<void> {
    const { fileName: imageName, ...data }: { fileName: string, data: Product } = req.body

    try {
      const product = new Product(data)
      product.imgUrl = `/public/${imageName}`
      await product.saveProduct()
      res.status(201).json({ message: 'Product created correctly', product })
    } catch (error) {
      res.status(500).send()
    }
  }

  public static async getProducts (_req: Request, res: Response): Promise<void> {
    try {
      const products = await ProductServices.findAllProducts()
      res.status(200).send(products)
    } catch (error) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  public static async getProduct (req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      const product = await ProductServices.findById(id)

      if (product !== null) {
        res.status(200).send(product)
        return
      }

      res.status(404).json({ message: `${StatusMessages.STATUS_404}` })
    } catch (error) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  public static async editProduct (req: Request, res: Response): Promise<void> {
    const { data } = req.body
    const { id } = req.params
    const imageName = req.file?.filename

    try {
      const bdProduct = await ProductServices.findById(id)

      if (bdProduct === null) {
        res.status(404).json({ message: `${StatusMessages.STATUS_404}, Product not found` })
        return
      }

      const editedProduct = new Product({ ...bdProduct, ...data })

      if (imageName !== null && imageName !== undefined) {
        const bdProductImage = Files.joinRoutes(process.cwd(), bdProduct.imgUrl)

        if (await Files.fileExist(bdProduct.imgUrl)) {
          const isBdProductImageDeleted = await Files.deleteFile(bdProductImage)
          if (!isBdProductImageDeleted) {
            res.status(500).json({ message: 'Server error trying to delete image' })
            return
          }
        }

        editedProduct.imgUrl = `/public/products/${imageName}`
      }

      const responseObject = await editedProduct.saveProduct()
      res.status(200).send(responseObject)
    } catch (error) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  public static async deleteProduct (req: Request, res: Response): Promise<void> {
    const { id } = req.body

    try {
      const isDeleted = await ProductServices.findByIdAnddelete(id)

      if (isDeleted) {
        res.status(204).send()
        return
      }
      res.status(404).json({ message: StatusMessages.STATUS_404 })
    } catch (error) {
      res.status(500).json({ message: `${StatusMessages.STATUS_500}` })
    }
  }
}
