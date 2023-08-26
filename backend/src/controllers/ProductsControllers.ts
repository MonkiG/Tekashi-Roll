import { type Request, type Response } from 'express'
import Files from '../helpers/Files'
import { Product } from '../Models/dto/Product.dto'
import ProductServices from '../helpers/ProductServices'
import StatusMessages from '../helpers/StatusMessages'
import { isValidObjectId } from 'mongoose'

export default class ProductsControllers {
  public static async addProduct (req: Request, res: Response): Promise<void> {
    const imageName = req.file?.filename
    const data = req.body

    if (imageName === undefined) {
      res.status(400).json({ message: 'Image don\'t provided' })
      return
    }

    if (imageName !== undefined && await Files.fileExist(`/public/products/${imageName}`)) {
      data.imgUrl = `/public/${imageName}`
      try {
        const product = await new Product(data).saveProduct()
        res.status(201).json({ message: 'Product created correctly', product })
      } catch (error) {
        res.status(500).send()
      }
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

    if (isValidObjectId(id)) {
      try {
        const product = await ProductServices.findById(id)

        if (product !== null) {
          res.status(200).send(product)
          return
        }

        res.status(404).json({ message: `${StatusMessages.STATUS_404}` })
        return
      } catch (error) {
        res.status(500).json({ message: 'Server error' })
        return
      }
    }

    res.status(400).json({ message: 'Invalid id' })
  }

  public static async editProduct (req: Request, res: Response): Promise<void> {
    const { id, ...data } = req.body
    const imageName = req.file?.filename

    if (isValidObjectId(id) && imageName !== undefined) {
      try {
        const bdProduct = await ProductServices.findById(id)
        if (bdProduct !== null) {
          const bdProductImage = Files.joinRoutes(process.cwd(), bdProduct.imgUrl)
          const isBdProductImageDeleted = await Files.deleteFile(bdProductImage)

          if (isBdProductImageDeleted) {
            const editedProduct = new Product({ ...bdProduct, ...data })
            editedProduct.imgUrl = `/public/products/${imageName}`
            const responseObject = await editedProduct.saveProduct()
            res.status(200).send(responseObject)
            return
          }

          res.status(500).json({ message: 'Server error trying to delete image' })
          return
        }

        res.status(404).json({ message: `${StatusMessages.STATUS_404}` })
        return
      } catch (error) {
        res.status(500).json({ message: 'Server error' })
      }
    }

    if (isValidObjectId(id) && imageName === undefined) {
      try {
        const bdProduct = await ProductServices.findById(id)

        if (bdProduct !== null) {
          const editedProduct = await new Product({ ...bdProduct, ...data }).saveProduct()
          res.status(200).send(editedProduct)
          return
        }
        res.status(404).json({ message: `${StatusMessages.STATUS_404}` })
        return
      } catch (error) {
        res.status(500).json({ message: 'Server error' })
      }
      return
    }

    res.status(400).json({ message: 'Invalid id' })
  }

  public static async deleteProduct (req: Request, res: Response): Promise<void> {
    const { id } = req.body
    if (id !== undefined && isValidObjectId(id)) {
      const isDeleted = await ProductServices.findByIdAnddelete(id)

      res.status(isDeleted ? 204 : 404).json({ message: isDeleted ? `${StatusMessages.STATUS_204}, product eliminated succesfully` : StatusMessages.STATUS_404 })
      return
    }
    res.status(400).json({ message: 'Invalid id' })
  }
}
