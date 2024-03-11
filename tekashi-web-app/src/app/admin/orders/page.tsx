'use client'
import { OrderStatus } from '@/app/helpers/OrderStatus'
import Description from '@/app/components/icons/Description'
import { type UUID } from 'crypto'
import { useState } from 'react'
import Bin from '@/app/components/icons/Bin'
import Kitchen from '@/app/components/icons/Kitchen'

export default function Orders (): JSX.Element {
  const [view, setView] = useState({
    togo: false,
    orders: true
  })

  const handleTogoView = (): void => {
    setView({
      togo: true,
      orders: false
    })
  }

  const handleOrdersView = (): void => {
    setView({
      togo: false,
      orders: true
    })
  }
  return (
    <>
     <header className='grid grid-cols-5 items-center my-5'>
      <h2 className="mb-2 mt-0 text-center font-bold text-xl col-start-3">{view.togo ? 'Pedidos para llevar' : 'Ordenes'}</h2>
      <div className='col-start-5'>
        <button className='bg-page-orange hover:bg-page-orange-hover rounded-full px-2 py-1 mx-2' onClick={handleTogoView}>To-go</button>
        <button className='bg-page-orange hover:bg-page-orange-hover rounded-full px-2 py-1 mx-2' onClick={handleOrdersView}>orders</button>
      </div>
     </header>
      <section className="h-[512px] w-[1029px] m-auto overflow-y-auto">
        {Array.from({ length: 10 }, (_, i) => (

          view.togo
            ? <OrderToGo key={crypto.randomUUID()} id={`Order ${i}`} orderNumber={i} user='Ramón Hernández' status={OrderStatus.PLACED}/>
            : <Order key={crypto.randomUUID()}/>

        ))}
      </section>
    </>
  )
}

interface OrderData {
  id: string | UUID
  orderNumber: string | number
  user: string
  status: OrderStatus
}

const Order = (): JSX.Element => {
  return (
    <div className='flex justify-around h-1/5 items-center bg-gray-300'>
      <div className='w-1/2'>
        <span className='px-2'>Pedido: ###</span>
        <span className='px-2'>Mesero: Ramón Hernández</span>
        <span className='px-2'>Mesa: ###</span>
      </div>
      <div className='flex justify-end'>
        <button title='See order description' className='px-2 bg-page-orange hover:bg-page-orange-hover rounded-full py-1 mx-2'>
          <Description />
        </button>
        <button title='Send order to kitchen' className='px-2 bg-page-orange hover:bg-page-orange-hover rounded-full py-1 mx-2'>
          <Kitchen/>
        </button>
        <button title='Delete Order' className='px-2 bg-page-orange hover:bg-page-orange-hover rounded-full py-1 mx-2'>
          <Bin />
        </button>
      </div>
    </div>
  )
}

const OrderToGo = (orderData: OrderData): JSX.Element => {
  return (
    <div className="grid grid-cols-9 grid-rows-1 relative w-full h-20">
      <ul className='flex justify-around items-center col-span-4 bg-gray-300'>
        <li>Pedido: {orderData.orderNumber}</li>
        <li>Usuario: {orderData.user}</li>
      </ul>
      {/** Estos botones le pondran el status al pedido */}
      <ul className='flex items-center justify-around col-span-4 bg-gray-300'>
        {Object.values(OrderStatus).map((status, i) => (

          <li key={crypto.randomUUID()}><button className='bg-page-orange hover:bg-page-orange-hover rounded-full px-2 py-1' title={`Set order in status: ${status}`}>{status.toLocaleUpperCase()}</button></li>
        ))}
      </ul>
      <div className='place-self-center'>
        <button className='mx-3 bg-page-orange hover:bg-page-orange-hover w-10 h-10 flex items-center justify-center rounded-full' title='See full order description'>
          <Description />
        </button>
      </div>
    </div>
  )
}
