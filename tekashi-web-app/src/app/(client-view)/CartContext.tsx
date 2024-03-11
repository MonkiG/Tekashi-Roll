'use client'
import { createContext } from 'react'
import useUserTogo from '../hooks/useUserTogo'

interface CartContextType {
  addToCart: ({ productId }: { productId: string }) => void
  products: any[]
  handleSetTogoProducts: ({ productId }: { productId: string }) => void
  handleSetTogoProductAmount: ({ productId, amount }: { productId: string, amount: number | string }) => void
  handleDeleteTogoProduct: ({ productId }: { productId: string }) => void
}
export const CartContext = createContext<CartContextType>({
  addToCart: ({
    productId
  }: {
    productId: string
  }) => {},
  products: [],
  handleSetTogoProducts: ({ productId }: { productId: string }) => {},
  handleSetTogoProductAmount: ({ productId, amount }: { productId: string, amount: number | string }) => {},
  handleDeleteTogoProduct: ({ productId }: { productId: string }) => {}
})

export function CartProvider ({ children }: { children: React.ReactNode }): JSX.Element {
  const {
    togoProducts: products,
    handleSetTogoProducts,
    handleSetTogoProductAmount,
    handleDeleteTogoProduct
  } = useUserTogo()

  const addToCart = ({ productId }: { productId: string }): void => {
    handleSetTogoProducts({ productId })
  }
  return (
    <CartContext.Provider value={{
      products,
      addToCart,
      handleSetTogoProducts,
      handleSetTogoProductAmount,
      handleDeleteTogoProduct
    }}>
        {children}
    </CartContext.Provider>
  )
}
