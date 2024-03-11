import { useEffect, useState } from 'react'

export interface CartProduct {
  id: string
  amount: number | string
}

export default function useUserTogo (): {
  togoProducts: CartProduct[]
  handleSetTogoProducts: ({ productId }: { productId: string }) => void
  handleSetTogoProductAmount: ({ productId, amount }: { productId: string, amount: number | string }) => void
  handleDeleteTogoProduct: ({ productId }: { productId: string }) => void
} {
  const [togoProducts, setTogoProducts] = useState<CartProduct[]>([])

  const handleSetTogoProducts = ({ productId }: { productId: string }): void => {
    setTogoProducts(prev => {
      return [...prev, { id: productId, amount: 1 }]
    })
  }

  const handleSetTogoProductAmount = ({ productId, amount }: { productId: string, amount: number | string }): void => {
    setTogoProducts(prev => {
      const product = prev.find(x => x.id === productId)
      if (!product) return [...prev]

      product.amount = amount
      return [
        ...prev,
        product
      ]
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
    handleSetTogoProductAmount,
    handleDeleteTogoProduct
  }
}
