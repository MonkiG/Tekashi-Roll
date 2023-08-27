import { type Request, type Response } from 'express'
import { Subcategory } from '../Models/Subcategory.model'
import StatusMessages from '../helpers/StatusMessages'

export default class SubcategoriesControllers {
  public static async addSubcategory (req: Request, res: Response): Promise<void> {
    const data = req.body

    try {
      await new Subcategory(data).save()
      res.status(201).json({ message: StatusMessages.STATUS_201 })
    } catch (e) {
      res.status(500).json({ message: StatusMessages.STATUS_500 })
    }
  }

  public static async getSubcategories (_req: Request, res: Response): Promise<void> {
    try {
      const data = await Subcategory.find({}).exec()
      res.status(200).send(data)
    } catch (e) {
      res.status(500).json({ message: StatusMessages.STATUS_500 })
    }
  }

  public static async getSubcategory (req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      const data = await Subcategory.findOne({ _id: id }).select('-__v').exec()
      if (data !== null) {
        res.status(200).send(data)
        return
      }
      res.status(404).json({ message: StatusMessages.STATUS_404 })
    } catch (error) {
      res.status(500).json({ message: StatusMessages.STATUS_500 })
    }
  }

  public static async editSubcategory (req: Request, res: Response): Promise<void> {
    const data = req.body
    try {
      const documentUpdated = await Subcategory.findOneAndUpdate({ _id: data.id }, { $set: data }, { new: true })
      if (documentUpdated !== null) {
        res.status(200).send(documentUpdated)
        return
      }

      res.status(404).json({ message: StatusMessages.STATUS_404 })
    } catch (error) {
      res.status(500).send()
    }
  }

  public static async deleteSubcategory (req: Request, res: Response): Promise<void> {
    const { id } = req.body

    try {
      const documentDeleted = await Subcategory.findByIdAndDelete(id)

      if (documentDeleted !== null) {
        res.status(204).send()
        return
      }

      res.status(404).json({ message: StatusMessages.STATUS_404 })
    } catch (error) {
      res.status(500).json({ message: StatusMessages.STATUS_500 })
    }
  }
}
