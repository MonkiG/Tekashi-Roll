import { getServerComponentClient } from '@/app/helpers/supabaseHelpers'
import { type UUID } from 'crypto'

export async function getUserTogos (userId: UUID): Promise<any> {
  const supabase = getServerComponentClient()
  const { data: togos } = await supabase.from('product_togo').select('togo(total, id, status), products(*, categories(name))').eq('togo.user_id', userId).not('status', 'eq', 'delivered')

  return togos
  // const {data: products} = await supabase.from('product_togo').select('*').eq('product_id', )
}
