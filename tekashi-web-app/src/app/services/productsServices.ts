import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { type AddProduct } from '../types'

export async function getAllProducts (): Promise<void> {

}

export async function getProductsByCategory (category: string): Promise<void> {

}

export async function getProductById (id: string): Promise<void> {

}

export async function addProduct (productData: AddProduct): Promise<any> {
  const { categoryId, imgUrl, ...rest } = productData
  const parseredData = { ...rest, category_id: categoryId, img_url: imgUrl }

  const supabase = createClientComponentClient()
  const {
    data
  } = await supabase.from('products').insert(parseredData).select()

  return data
}
