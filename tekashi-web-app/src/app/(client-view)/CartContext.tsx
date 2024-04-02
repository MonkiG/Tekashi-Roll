'use client'
import { createContext } from 'react'
import useUserTogo, { type CartProduct } from '../hooks/useUserTogo'

interface CartContextType {
  products: any[]
  handleSetTogoProducts: ({ product }: { product: CartProduct }) => void
  handleDeleteTogoProduct: ({ productId }: { productId: string }) => void
  handleSetTogoProductAmount: ({ productId }: { productId: string, amount: number | string }) => void
}
export const CartContext = createContext<CartContextType>({
  products: [],
  handleSetTogoProducts: ({ product }: { product: CartProduct }) => {},
  handleDeleteTogoProduct: ({ productId }: { productId: string }) => {},
  handleSetTogoProductAmount: ({ productId }: { productId: string, amount: number | string }) => {}
})

export function CartProvider ({ children }: { children: React.ReactNode }): JSX.Element {
  const {
    togoProducts: products,
    handleSetTogoProducts,
    handleDeleteTogoProduct,
    handleSetTogoProductAmount
  } = useUserTogo()

  return (
    <CartContext.Provider value={{
      products,
      handleSetTogoProducts,
      handleDeleteTogoProduct,
      handleSetTogoProductAmount
    }}>
        {children}
    </CartContext.Provider>
  )
}
