// import { getServerComponentClient } from '@/app/helpers/supabaseHelpers'
import CategorySection from './components/CategorySection'

export default async function Dishes (): Promise<JSX.Element> {
  // const supabase = getServerComponentClient()

  // const {
  //   data,
  //   error
  // } = await supabase.from('products').select('*')

  // console.log(data)
  return (
    <>
      {Array.from({ length: 3 }, (_, i) => <CategorySection key={i} products={Array.from({ length: 6 }, () => 'product')}/>)}
    </>

  )
}
