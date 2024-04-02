import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { type AddProduct, type Product } from '../../types'

export async function getProductsByCategory (category: string): Promise<void> {

}

export async function getProductById (id: string): Promise<void> {

}

export async function addProduct (productData: AddProduct): Promise<Product | null> {
  const { categoryId, imgUrl, ...rest } = productData
  const parseredData = { ...rest, category_id: categoryId, img_url: imgUrl }

  const supabase = createClientComponentClient()
  const {
    data
  } = await supabase.from('products').insert(parseredData).select().single()

  return data
}

export async function deleteProductById (productId: string): Promise<boolean> {
  const supabase = createClientComponentClient()
  const {
    data

  } = await supabase.from('products').delete().eq('id', productId).select()
  return Boolean(data)
}
