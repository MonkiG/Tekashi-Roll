import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
export async function uploadProductImage (imageFile: File, productName: string): Promise<string> {
  const supabase = createClientComponentClient()
  const {
    data,
    error
  } = await supabase.storage.from('images').upload(`products/${productName}`, imageFile, { upsert: true })

  console.log(data)
  console.error(error)
  if (!data || error) throw new Error('Error uploading the image, try later')

  return data.path
}
