import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getAllProducts (): Promise<any[] | null> {
  const supabase = createClientComponentClient()

  const {
    data,
    error
  } = await supabase.from('products').select('*')

  return data
}
