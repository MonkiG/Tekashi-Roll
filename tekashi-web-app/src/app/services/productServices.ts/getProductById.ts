import { type Product } from '@/app/types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { type UUID } from 'crypto'

export default async function getProductById (id: UUID): Promise<Product | null> {
  const supabase = createClientComponentClient()
  const {
    data,
    error
  } = await supabase.from('products').select().eq('id', id).single()

  return data
}
