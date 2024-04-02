'use client'

import Image from 'next/image'
import Edit from '@/app/components/icons/Edit'
import Description from '@/app/components/icons/Description'
import Bin from '@/app/components/icons/Bin'
import StatusCircle from '@/app/components/icons/StatusCircle'
import { type Product } from '@/app/types'

export default function AdminProductCard ({ data, handleDeleteProduct }: { data: Product, handleDeleteProduct: () => Promise<void> }): JSX.Element {
  return (
      <article className='relative min-h-52 flex flex-col justify-between max-h-[244px] max-w-[316px]'>
        <button
          onClick={handleDeleteProduct}
          className='absolute right-[-10px] top-[-10px] bg-white w-14 h-14 rounded-full flex justify-center items-center ' title='Delete product'><Bin /></button>
        <figure className=''>
          <Image src={data.imgUrl} alt='product image' width={316} height={160} className='w-[316px] h-[160px] object-cover'/>
          <h3 className='px-2 pt-2'>{data.name}</h3>
          <div className='flex justify-between items-center px-2 mt-2'>
            <span>Precio: ${data.price} MXN</span>
            <div className='w-1/2 flex items-center justify-end'>
              <button className='flex justify-center items-center bg-transparent rounded-full hover:bg-[rgba(0,0,0,0.1)] w-10 h-10' title='See product description'>
                <Description />
              </button>
              <button className='flex justify-center items-center bg-transparent rounded-full hover:bg-[rgba(0,0,0,0.1)] w-10 h-10' title='Edit product'>
                <Edit />
              </button>
              <button
                className='flex justify-center items-center bg-transparent rounded-full hover:bg-[rgba(0,0,0,0.1)] w-10 h-10'
                title='Enable/disable product'>
                <StatusCircle color={data.enabled ? 'enable' : 'disable'} />
              </button>
            </div>
          </div>
        </figure>
      </article>
  )
}
// 'https://placehold.co/316x160'
