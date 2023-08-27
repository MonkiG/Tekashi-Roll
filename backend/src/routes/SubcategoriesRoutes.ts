import { Router } from 'express'
import AuthMiddlewares from '../middlewares/Auth.middleware'
import SubcategoriesControllers from '../controllers/SubcategoriesControllers'

export default class SubcategoriesRoutes {
  #router = Router()
  public static subcategories = '/subcategories' // MAIN
  public static addSubcategory = '/' // POST
  public static getSubcategories = '/' // GET
  public static getSubcategory = '/:id' // GET
  public static editSubcategory = '/' // PATCH
  public static deleteSubcategory = '/' // DELETE

  constructor () {
    this.#router.post(SubcategoriesRoutes.addSubcategory, AuthMiddlewares.isValidToken, AuthMiddlewares.isAdmin, SubcategoriesControllers.addSubcategory)
    this.#router.get(SubcategoriesRoutes.getSubcategories, SubcategoriesControllers.getSubcategories)
    this.#router.get(SubcategoriesRoutes.getSubcategory, AuthMiddlewares.isValidId, SubcategoriesControllers.getSubcategory)
    this.#router.patch(SubcategoriesRoutes.editSubcategory, AuthMiddlewares.isValidId, AuthMiddlewares.isValidToken, AuthMiddlewares.isAdmin, SubcategoriesControllers.editSubcategory)
    this.#router.delete(SubcategoriesRoutes.deleteSubcategory, AuthMiddlewares.isValidId, AuthMiddlewares.isValidToken, AuthMiddlewares.isAdmin, SubcategoriesControllers.deleteSubcategory)
  }

  public static router (): Router {
    return new SubcategoriesRoutes().#router
  }
}
