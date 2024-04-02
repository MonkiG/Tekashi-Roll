import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type UUID } from 'crypto'

export default async function toggleProductStatus (status: boolean, id: UUID): Promise<void> {
  const supabase = createClientComponentClient()
  const { error } = await supabase.from('products').update({ enabled: status }).eq('id', id)
}
