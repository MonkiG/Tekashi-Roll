'use client'
import { createContext } from 'react'
import useUserTogo, { type CartProduct } from '../hooks/useUserTogo'
import useAccountInfo from '../hooks/useUserData'
import { type toast } from 'sonner'

export interface CartContextType {
  products: any[]
  handleSetTogoProducts: ({ product }: { product: CartProduct }) => void
  handleDeleteTogoProduct: ({ productId }: { productId: string }) => void
  handleSetTogoProductAmount: ({ productId }: { productId: string, amount: number | string }) => void
  handleChange: (e: any, formToast?: typeof toast) => void
  userAccountInfo: Record<string, string>
  enableUserEdit: boolean
  handleSubmit: (e: any, formToast: typeof toast) => void
  handleEnableUserEdit: (state: boolean) => void
}
export const CartContext = createContext<CartContextType>({
  products: [],
  handleSetTogoProducts: ({ product }: { product: CartProduct }) => {},
  handleDeleteTogoProduct: ({ productId }: { productId: string }) => {},
  handleSetTogoProductAmount: ({ productId }: { productId: string, amount: number | string }) => {},
  handleChange: (e: any, formToast?: typeof toast) => {},
  userAccountInfo: {
    phone: '',
    street: '',
    localidad: '',
    home: ''
  },
  handleSubmit: (e: any, formToast: typeof toast) => {},
  enableUserEdit: false,
  handleEnableUserEdit: (_state: boolean) => {}
})

export function CartProvider ({ children }: { children: React.ReactNode }): JSX.Element {
  const {
    togoProducts: products,
    handleSetTogoProducts,
    handleDeleteTogoProduct,
    handleSetTogoProductAmount
  } = useUserTogo()

  const { handleChange, userAccountInfo, handleSubmit, enableUserEdit, handleEnableUserEdit } = useAccountInfo()
  return (
    <CartContext.Provider value={{
      products,
      handleSetTogoProducts,
      handleDeleteTogoProduct,
      handleSetTogoProductAmount,
      handleChange,
      userAccountInfo,
      handleSubmit,
      enableUserEdit,
      handleEnableUserEdit
    }}>
        {children}
    </CartContext.Provider>
  )
}
