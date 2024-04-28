import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function getAllTogos (): Promise<void> {
  const supabase = createClientComponentClient()
  const { data, error } = await supabase.from('product_togo').select('togo(total, id, status), products(*, categories(name))').eq('togo.status', 'delivered')
}
