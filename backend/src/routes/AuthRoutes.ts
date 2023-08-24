import { Router } from 'express'
import AuthControllers from '../controllers/AuthControllers'
import AuthMiddlewares from '../middlewares/Auth.middleware'

export default class AuthRoutes {
  #router = Router()
  public static login = '/login' // GET
  public static signup = '/signup' // POST
  public static auth = '/auth' // POST
  constructor () {
    this.#router.get('/', AuthControllers.main)

    this.#router.post(AuthRoutes.login, AuthMiddlewares.isRegistered, AuthControllers.login)

    this.#router.post(AuthRoutes.signup, AuthMiddlewares.isRegistered, AuthControllers.signup)

    this.#router.all('*', AuthControllers.methodNotAllowed)
  }

  public static router (): Router {
    return new AuthRoutes().#router
  }
}
