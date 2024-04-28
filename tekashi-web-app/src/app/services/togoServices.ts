'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type Product } from '../types'
import { type UUID } from 'crypto'

interface Togo {
  date_time: Date
  detail: string
  id: UUID
  products_amount: number
  total: number
}
export async function makeTogo (products: Product[], userId: UUID): Promise<void> {
  const supabase = createClientComponentClient()
  const totalAmount = products.reduce((prev, curr) => prev + (parseFloat(curr.price as string) * curr.amount), 0)
  const { data: togoData } = await supabase.from('togo')
    .insert({ detail: '', total: totalAmount, user_id: userId })
    .select()
    .single()
  const { id: togoId } = togoData as Togo
  const productTogoArray = products.map(product => ({ togo_id: togoId, product_id: product.id, product_amount: product.amount }))
  const { error: productTogoError } = await supabase.from('product_togo').insert(productTogoArray).select()
  console.error(productTogoError)
}
