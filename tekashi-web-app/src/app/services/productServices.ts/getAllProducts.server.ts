import { getServerComponentClient } from '@/app/helpers/supabaseHelpers'

export async function getAllProducts (): Promise<any[] | null> {
  const supabase = getServerComponentClient()

  const {
    data,
    error
  } = await supabase.from('products').select('*')

  return data
}
