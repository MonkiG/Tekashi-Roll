import { createContext, useContext } from 'react'
import useUser from '../hooks/useUser'

export const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const { userToken, handleUserData, userData } = useUser()

  return (
        <AuthContext.Provider value={{ userToken, handleUserData, userData }}>
            {children}
        </AuthContext.Provider>
  )
}

export function useAuthProvider () {
  const context = useContext(AuthContext)
  if (!context) throw new Error('Component should be inside the Auth provider')

  return context
}
