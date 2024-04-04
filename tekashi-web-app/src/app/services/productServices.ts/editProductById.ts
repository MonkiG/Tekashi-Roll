import { type Product } from '@/app/types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type UUID } from 'crypto'

export default async function editProductById (id: UUID, data: Partial<Product>): Promise<void> {
  const supabase = createClientComponentClient()

  /** Todo
   * Parser data
   */
  const { error } = await supabase.from('products').update(data).eq('id', id)
  console.error(error)
}
