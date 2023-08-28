import { Router } from 'express'
import AuthMiddlewares from '../middlewares/Auth.middleware'
import CategoryControllers from '../controllers/CategoriesControllers'

export default class CategoriesRoutes {
  #router = Router()
  public static categories = '/categories' // MAIN
  public static addCategory = '/' // POST
  public static getCategories = '/' // GET
  public static getCategory = '/:id' // GET
  public static editCategory = '/' // PATCH
  public static deleteCategory = '/'// DELETE

  constructor () {
    this.#router.post(CategoriesRoutes.addCategory, AuthMiddlewares.isValidToken, AuthMiddlewares.isAdmin, CategoryControllers.addCategory)
    this.#router.get(CategoriesRoutes.getCategories, CategoryControllers.getCategories)
    this.#router.get(CategoriesRoutes.getCategory, AuthMiddlewares.isValidId, CategoryControllers.getCategory)
    this.#router.patch(CategoriesRoutes.editCategory, AuthMiddlewares.isValidId, AuthMiddlewares.isValidToken, AuthMiddlewares.isAdmin, CategoryControllers.editCategory)
    this.#router.delete(CategoriesRoutes.deleteCategory, AuthMiddlewares.isValidId, AuthMiddlewares.isValidToken, AuthMiddlewares.isAdmin, CategoryControllers.deleteCategory)
  }

  public static router (): Router {
    return new CategoriesRoutes().#router
  }
}
