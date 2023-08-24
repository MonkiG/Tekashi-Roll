import { Router } from 'express'
import ProductsControllers from '../controllers/ProductsControllers'
import Multer from '../helpers/Multer'
// import AuthMiddlewares from '../middlewares/Auth.middleware'

export default class ProductsRoutes {
  #router = Router()
  public static products = '/products'
  public static images = '/public/:imageName'
  public static addProduct = '/' // POST
  public static getProducts = '/' // GET
  public static getProduct = '/:id' // GET
  public static editProduct = '/:id' // PATCH
  public static deleteProduct = '/:id' // DELETE

  constructor () {
    this.#router.post(ProductsRoutes.addProduct, new Multer('/public/products').upload.single('image'), ProductsControllers.addProduct)
    this.#router.get(ProductsRoutes.getProducts, ProductsControllers.getProducts)
    this.#router.get(ProductsRoutes.getProduct, ProductsControllers.getProduct)
    this.#router.patch(ProductsRoutes.editProduct, ProductsControllers.editProduct)
    this.#router.delete(ProductsRoutes.deleteProduct, ProductsControllers.deleteProduct)
  }

  public static router (): Router {
    return new ProductsRoutes().#router
  }
}
