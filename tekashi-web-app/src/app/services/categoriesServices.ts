import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type Category } from '../types'

export async function getAllCategories (): Promise<Category[] | null> {
  const supabase = createClientComponentClient()
  const {
    data
  } = await supabase.from('categories').select('*')

  if (!data) return null

  return data
}

export async function getCategoryById (): Promise<void> {

}
