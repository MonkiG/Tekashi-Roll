import { type UUID } from 'crypto'
import { type AppRoles } from './helpers/AppRoles'

export type HeaderTypes = 'Main' | 'Auth'

export interface User {
  id: UUID
  name: string
  lastName: string
  phone: string
  role: AppRoles

}
export interface UserLoginWithPasswordData {
  email?: string
  password: string
  phone?: string | number
}

export interface UserSignUp {
  email: string
  password: string
  name: string
  lastName: string
  phone: string
}

export interface UserAuth extends UserSignUp {}

export type AuthType = 'login' | 'signup'

export type AuthFormData<T extends AuthType> =
  T extends 'login' ? UserLoginWithPasswordData :
    T extends 'signup' ? UserSignUp :
      UserAuth

export interface RoleData {
  role_id: UUID
  roles: {
    role_name: string
  }
}

export interface Category {
  id: UUID
  name: string
  description: string
}

export interface Product {
  id: UUID
  name: string
  price: string | number
  description: string
  imgUrl: string
  categoryId: string
  enabled: boolean
}

export type AddProduct = Omit<Product, 'id' | 'enabled'> & { imgUrl: string }
