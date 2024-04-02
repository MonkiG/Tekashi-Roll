import Image from 'next/image'
import Description from '@/app/components/icons/Description'
import AddCart from '@/app/components/icons/AddCart'
import { type Product } from '@/app/types'
export default function ProductCard ({ data, addToCart }: { data: any, addToCart: ({ product }: { product: Product }) => void }): JSX.Element {
  return (
        <article className='relative min-h-52 flex flex-col justify-between max-h-[244px] max-w-[316px]'>
        <figure className=''>
          <Image src={data.imgUrl} alt='product image' width={316} height={160} className='w-[316px] h-[160px] object-cover'/>
          <h3 className='px-2 pt-2'>{data.name}</h3>
          <div className='flex justify-between items-center px-2 mt-2'>
            <span>Precio: ${data.price} MXN</span>
            <div className='w-1/2 flex items-center justify-end'>
              <button className='flex justify-center items-center bg-transparent rounded-full hover:bg-[rgba(0,0,0,0.1)] w-10 h-10' title='See product description'>
                <Description />
              </button>
              <button
                className='flex justify-center items-center bg-transparent rounded-full hover:bg-[rgba(0,0,0,0.1)] w-10 h-10'
                title='Add to cart'
                onClick={() => { addToCart({ product: data }) }}
              >
                <AddCart />
              </button>
            </div>
          </div>
        </figure>
      </article>
  )
}
