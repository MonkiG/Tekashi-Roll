import { CartContext, type CartContextType } from '@/app/(client-view)/CartContext'
import { useContext } from 'react'
export default function useCartContext (): CartContextType {
  const context = useContext(CartContext)
  if (!context) throw new Error('Context not allowed')
  return context
}
