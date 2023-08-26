import { Router } from 'express'
import ProductsControllers from '../controllers/ProductsControllers'
import Files from '../helpers/Files'
import AuthMiddlewares from '../middlewares/Auth.middleware'
// import AuthMiddlewares from '../middlewares/Auth.middleware'

export default class ProductsRoutes {
  #router = Router()
  public static products = '/products'
  public static images = '/public/:imageName'
  public static addProduct = '/' // POST
  public static getProducts = '/' // GET
  public static getProduct = '/:id' // GET
  public static editProduct = '/' // PATCH
  public static deleteProduct = '/' // DELETE

  constructor () {
    this.#router.post(ProductsRoutes.addProduct, AuthMiddlewares.isAdmin, new Files('/public/products').multerUpload.single('image'), ProductsControllers.addProduct)
    this.#router.get(ProductsRoutes.getProducts, ProductsControllers.getProducts)
    this.#router.get(ProductsRoutes.getProduct, ProductsControllers.getProduct)
    this.#router.patch(ProductsRoutes.editProduct, AuthMiddlewares.isAdmin, new Files('/public/products').multerUpload.single('image'), ProductsControllers.editProduct)
    this.#router.delete(ProductsRoutes.deleteProduct, AuthMiddlewares.isAdmin, ProductsControllers.deleteProduct)
  }

  public static router (): Router {
    return new ProductsRoutes().#router
  }
}
