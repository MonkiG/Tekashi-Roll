import { type Request, type Response } from 'express'
import StatusMessages from '../helpers/StatusMessages'
import { Category } from '../Models/Category.model'

export default class CategoryControllers {
  public static async addCategory (req: Request, res: Response): Promise<void> {
    const data = req.body

    try {
      await new Category(data).save()
      res.status(201).json({ message: StatusMessages.STATUS_201 })
    } catch (error) {
      res.status(500).json({ message: StatusMessages.STATUS_500 })
    }
  }

  public static async getCategories (_req: Request, res: Response): Promise<void> {
    try {
      const categories = await Category.find({}).select('-__v').populate({ path: 'subcategories', select: '-__v' }).populate({ path: 'products', select: '-__v' })
      res.status(200).send(categories.length > 0 ? categories : { message: `${StatusMessages.STATUS_200}, No categories founded` })
    } catch (error) {
      res.status(500).json({ message: StatusMessages.STATUS_500 })
    }
  }

  public static async getCategory (req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      const category = await Category.findOne({ _id: id }).select('-__v').populate({ path: 'subcategories', select: '-__v' }).populate({ path: 'products', select: '-__v' })
      if (category !== null) {
        res.status(200).send(category)
        return
      }

      res.status(404).json({ message: StatusMessages.STATUS_404 })
    } catch (error) {
      res.status(500).json({ message: StatusMessages.STATUS_500 })
    }
  }

  public static async editCategory (req: Request, res: Response): Promise<void> {
    const { id, ...data } = req.body

    try {
      const documentUpdated = await Category.findOneAndUpdate({ _id: id }, data, { new: true }).select('-__v').populate({ path: 'subcategories', select: '-__v' }).populate({ path: 'products', select: '-__v' })
      if (documentUpdated !== null) {
        res.status(200).send(documentUpdated)
        return
      }

      res.status(404).json({ message: StatusMessages.STATUS_404 })
    } catch (error) {
      res.status(500).json({ message: StatusMessages.STATUS_500 })
    }
  }

  public static async deleteCategory (req: Request, res: Response): Promise<void> {
    const { id } = req.body
    try {
      const documentDeleted = await Category.findByIdAndDelete(id)

      if (documentDeleted != null) {
        res.status(204).send()
        return
      }

      res.status(404).json({ message: StatusMessages.STATUS_404 })
    } catch (error) {
      res.status(500).json({ message: StatusMessages.STATUS_500 })
    }
  }
}
