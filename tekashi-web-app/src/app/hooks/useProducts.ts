import { useState, useEffect } from 'react'
import { getAllProducts } from '../services/productServices.ts/getAllProducts.client'
import { type Product } from '../types'

export default function useProducts (again: any): { products: Product[] | null } {
  const [products, setProducts] = useState<Product[] | null>(null)

  useEffect(() => {
    getAllProducts()
      .then(data => {
        if (data) {
          const parseredProducts = data.map(info => ({ ...info, imgUrl: info.img_url, categoryId: info.category_id }))
          setProducts(parseredProducts)
        }
      })
      .catch(e => { console.error(e) })
  }, [again])
  return { products }
}
