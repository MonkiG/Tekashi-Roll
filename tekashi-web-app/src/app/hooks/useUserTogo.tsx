import { useEffect, useState } from 'react'
import { type Product } from '../types'

export interface CartProduct extends Product {
  amount: number | string
}

export default function useUserTogo (): {
  togoProducts: CartProduct[]
  handleSetTogoProducts: ({ product }: { product: CartProduct }) => void
  handleDeleteTogoProduct: ({ productId }: { productId: string }) => void
  handleSetTogoProductAmount: ({ productId, amount }: { productId: string, amount: number | string }) => void
} {
  const [togoProducts, setTogoProducts] = useState<CartProduct[]>([])

  const handleSetTogoProducts = ({ product }: { product: CartProduct }): void => {
    const current = togoProducts.find(x => x.id === product.id)
    if (current) return
    setTogoProducts(prev => {
      return [...prev, product]
    })
  }

  const handleSetTogoProductAmount = ({ productId, amount }: { productId: string, amount: number | string }): void => {
    setTogoProducts(prev => {
      const updatedProducts = prev.map(product => {
        if (product.id === productId) {
          return { ...product, amount }
        }
        return product
      })

      return updatedProducts
    })
  }

  const handleDeleteTogoProduct = ({ productId }: { productId: string }): void => {
    setTogoProducts(prev => {
      const filtered = prev.filter(x => x.id !== productId)
      return filtered
    })
  }

  useEffect(() => {
    // get cart products
  }, [])

  return {
    togoProducts,
    handleSetTogoProducts,
    handleDeleteTogoProduct,
    handleSetTogoProductAmount
  }
}
