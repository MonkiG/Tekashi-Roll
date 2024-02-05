export type HeaderTypes = 'Main' | 'Auth'

export interface BaseProps {
  className?: string
}
export interface HeaderProps extends BaseProps {
  isLogged: boolean
  userName?: string
  headerType: HeaderTypes
}

export interface MainHeaderProps {
  userName: string
  userId: string
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
