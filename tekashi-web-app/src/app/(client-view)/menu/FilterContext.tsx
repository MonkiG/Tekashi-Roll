'use client'
import useCategories from '@/app/hooks/useCategories'
import useProducts from '@/app/hooks/useProducts'
import { type CartProduct } from '@/app/hooks/useUserTogo'
import { type Category, type Product } from '@/app/types'
import { createContext, useState } from 'react'

interface Filter {
  category: string
  price: string
  name: string
}
interface FilterContextObj {
  products: Product[] | null
  filters: Filter
  handleFilters: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  categories: Category[] | null
  handleAgain: () => void
}
export const FilterContext = createContext<FilterContextObj>({
  products: [],
  filters: {
    category: 'any',
    name: '',
    price: ''
  },
  handleFilters: () => {},
  categories: [],
  handleAgain: () => {}
})

export default function FilterProvider ({ children }: { children: React.ReactNode }): JSX.Element {
  const [filters, setFilters] = useState({
    category: 'any',
    name: '',
    price: ''
  })
  const { categories } = useCategories()
  const [again, setAgain] = useState(false)
  const { products } = useProducts(again)
  const handleFilters = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const name = e.target.name
    const value = e.target.value
    setFilters(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const toCartProducts = (products: Product[]): CartProduct[] => products.map((product, i) => ({ ...product, amount: 1 }))

  const handleFilter = (products: Product[] | null): Product[] => {
    if (!products) return [] as Product[]
    // if (filters.category === 'any') return products
    return toCartProducts(products.filter(product => product.enabled &&
      ((filters.category === 'any' || product.categoryId === filters.category) &&
      (String(product.price).includes(filters.price) || String(product.price) === '') &&
      (product.name === '' || product.name.toLocaleLowerCase().includes(filters.name.toLocaleLowerCase())))

    ))
  }

  const handleAgain = (): void => { setAgain(!again) }

  return (
    <FilterContext.Provider value={{
      products: handleFilter(products),
      filters,
      handleFilters,
      categories,
      handleAgain
    }}>
      { children }
    </FilterContext.Provider>
  )
}
