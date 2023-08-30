import { Router } from 'express'
import ProductsControllers from '../controllers/ProductsControllers'
import Files from '../helpers/Files'
import AuthMiddlewares from '../middlewares/Auth.middleware'
import FileMiddlewares from '../middlewares/File.middleware'

export default class ProductsRoutes {
  #router = Router()
  public static products = '/products'
  public static addProduct = '/' // POST
  public static getProducts = '/' // GET
  public static getProduct = '/:id' // GET
  public static editProduct = '/:id' // PATCH
  public static deleteProduct = '/' // DELETE

  constructor () {
    this.#router.post(ProductsRoutes.addProduct, AuthMiddlewares.isValidToken, AuthMiddlewares.isAdmin, new Files('/static/products').multerUpload.single('image'), FileMiddlewares.isImage, ProductsControllers.addProduct)
    this.#router.get(ProductsRoutes.getProducts, ProductsControllers.getProducts)
    this.#router.get(ProductsRoutes.getProduct, AuthMiddlewares.isValidId, ProductsControllers.getProduct)
    this.#router.patch(ProductsRoutes.editProduct, AuthMiddlewares.isValidToken, AuthMiddlewares.isValidId, AuthMiddlewares.isAdmin, new Files('/static/products').multerUpload.single('image'), ProductsControllers.editProduct)
    this.#router.delete(ProductsRoutes.deleteProduct, AuthMiddlewares.isValidToken, AuthMiddlewares.isValidId, AuthMiddlewares.isAdmin, ProductsControllers.deleteProduct)
  }

  public static router (): Router {
    return new ProductsRoutes().#router
  }
}
