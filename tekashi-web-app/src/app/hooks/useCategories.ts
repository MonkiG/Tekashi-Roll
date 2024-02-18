import { useEffect, useState } from 'react'
import { type Category } from '../types'
import { getAllCategories } from '../services/categoriesServices'

export default function useCategories (): { categories: Category[] | null } {
  const [categories, setCategories] = useState<Category[] | null>(null)
  useEffect(() => {
    getAllCategories().then(data => {
      setCategories(data)
    }).catch(e => { console.error(e) })
  }, [])

  return { categories }
}
