import { Router } from 'express'
import AuthControllers from '../controllers/AuthControllers'
import AuthMiddlewares from '../middlewares/Auth.middleware'

export default class AuthRoutes {
  #router = Router()
  public static Login = '/login'
  public static Signup = '/signup'
  public static Auth = '/auth'
  constructor () {
    this.#router.get('/', AuthControllers.main)

    this.#router.post(AuthRoutes.Login, AuthMiddlewares.isRegistered, AuthControllers.login)

    this.#router.post(AuthRoutes.Signup, AuthMiddlewares.isRegistered, AuthControllers.signup)

    this.#router.all('*', AuthControllers.methodNotAllowed)
  }

  public static router (): Router {
    return new AuthRoutes().#router
  }
}
