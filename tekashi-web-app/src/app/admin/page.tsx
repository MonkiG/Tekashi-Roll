import { getServerComponentClient } from '../helpers/supabaseHelpers'
import Image from 'next/image'
import Edit from '../components/icons/Edit'
import Description from '../components/icons/Description'
import Bin from '../components/icons/Bin'

export default async function MainAdmin (): Promise<JSX.Element> {
  const supabase = getServerComponentClient()

  const {
    data,
    error
  } = await supabase.from('products').select('*')

  return (
    <>
      {Array.from({ length: 3 }, (_, i) => <CategorySection key={i} products={Array.from({ length: 6 })}/>)}
    </>

  )
}

const CategorySection = ({ category, products }: { category?: string, products?: any[] }): JSX.Element => {
  return (
    <>
      <h2 className="m-5 text-center font-bold text-xl">Titulo categoria</h2>
      <section className='m-10'>
        <div className='grid grid-cols-3 row-auto gap-x-20 gap-y-10'>
          {products?.map((_, i) => <AdminProductCard key={`product ${i}`}/>)}
        </div>
      </section>
    </>
  )
}

const AdminProductCard = (): JSX.Element => {
  return (
    <article className='relative min-h-52 flex flex-col justify-between max-h-[244px] max-w-[316px]'>
      <button className='absolute right-[-10px] top-[-10px] bg-white w-14 h-14 rounded-full flex justify-center items-center ' title='Delete product'><Bin /></button>
      <figure className=''>
        <Image src={'https://placehold.co/316x160'} alt='product image' width={316} height={160} className='w-full'/>
        <h3 className='px-2 pt-2'>Nombre del platillo</h3>
        <div className='flex justify-between items-center px-2 mt-2'>
          <span>Precio:</span>
          <div className='w-1/2 flex justify-end'>
            <button className='flex justify-center items-center bg-transparent rounded-full hover:bg-[rgba(0,0,0,0.1)] w-10 h-10' title='See product description'>
              <Description />
            </button>
            <button className='flex justify-center items-center bg-transparent rounded-full hover:bg-[rgba(0,0,0,0.1)] w-10 h-10' title='Edit product'>
              <Edit />
            </button>
          </div>
        </div>
      </figure>
    </article>
  )
}
