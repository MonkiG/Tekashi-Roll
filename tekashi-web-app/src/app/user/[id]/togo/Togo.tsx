'use client'

import { useState } from 'react'
import { type GroupedData } from './page'

import Modal from '@/app/components/Modal'
import { type UUID } from 'crypto'

export default function TogoComponent ({ data }: { data: GroupedData }): JSX.Element {
  const statusDictionary: Record<string, string> = {
    preparing: 'En preparación',
    delivering: 'En reparto',
    delivered: 'Entregado'
  }
  const [showProducts, setShowProducts] = useState(false)

  const handleShowProducts = (status: boolean) => () => { setShowProducts(status) }
  return (

    <>
      {showProducts && <OrderProductsModal onClose={handleShowProducts(false)} products={data.products as OrderProducts[]}/>}
      <article className='px-5 py-1 pb-2 border-b-2 border-black border-solid'>
        <h2>Orden: {data.id.slice(-4)}</h2>

        <div className='flex justify-between'>
            <div>
                Total: <span>$ {data.total} MXN</span>
            </div>
            <div>
                status: <span
                    className={
                        `${data.status === 'preparing' && 'bg-page-red'} 
                        ${data.status === 'delivering' && 'bg-page-orange'}
                        ${data.status === 'delivered' && 'bg-green-700'}
                        rounded-full py-1 px-2 text-white`
                    }>{statusDictionary[data.status]}</span>
            </div>
            <button onClick={handleShowProducts(true)} className='underline'>
                productos: <span>{data.products.reduce((prev, curr) => prev + curr.amount, 0) || data.products.length}</span>
            </button>
          </div>
      </article>
      </>
  )
}

interface OrderProducts {
  id: UUID
  name: string
  price: number
  enabled: boolean
  img_url: string
  categories: { name: string }
  category_id: UUID
  description: string
}
export const OrderProductsModal = ({ onClose, products }: { onClose: () => void, products: OrderProducts[] }): JSX.Element => {
  return (
  <Modal className='flex justify-center items-center'>
     <div className='w-3/4 h-5/6 bg-gray-200 border-3 border-page-orange border-solid px-16 pt-12 relative'>
          <h2 className='text-center text-2xl'>Productos</h2>
          <hr className='border-page-gray w-full m-auto border-t-2 mb-2'/>
          <button className='absolute right-5 top-3 text-3xl' onClick={onClose} title='Close modal'>x</button>
          <ul>
            {products
              ? products.map(product => (
              <li className='border-b-2 border-solid border-black py-2' key={product.id}>
                Producto: {product.name} <br />
                Descripción: {product.description} <br />
                Precio: ${product.price} MXN <br />
                <a href={product.img_url} className='underline' target='_blank'>Image</a>
              </li>
              ))
              : null}
          </ul>
        </div>
  </Modal>)
}
