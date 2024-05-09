'use client'
import { OrderStatus } from '@/app/helpers/OrderStatus'
import Description from '@/app/components/icons/Description'
import { type UUID } from 'crypto'
import { useRef, useState } from 'react'
// import Bin from '@/app/components/icons/Bin'
// import Kitchen from '@/app/components/icons/Kitchen'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import useTogos from '@/app/hooks/useTogos'
import Link from 'next/link'
// import useOrders from '@/app/hooks/useOrders'

export default function Orders (): JSX.Element {
  const [view, setView] = useState({
    togo: true,
    orders: false
  })

  const supabaseRef = useRef(createClientComponentClient())
  const { togos, handleTogos } = useTogos(supabaseRef.current)
  // const { orders } = useOrders(supabaseRef.current)

  const handleTogoView = (): void => {
    setView({
      togo: true,
      orders: false
    })
  }

  // const handleOrdersView = (): void => {
  //   setView({
  //     togo: false,
  //     orders: true
  //   })
  // }
  return (
    <>
     <header className='flex justify-between'>
      <h2 className="mb-2 mt-0 text-center font-bold text-xl col-start-3">{view.togo ? 'Pedidos para llevar' : 'Ordenes'}</h2>
      <div className='col-end-5 col-span-2 '>
        <button className='bg-page-orange hover:bg-page-orange-hover rounded-full px-2 py-1 mx-2' onClick={handleTogoView}>To-go</button>
        <Link className='bg-page-orange hover:bg-page-orange-hover rounded-full px-2 py-1 mx-2' href={'/admin/orders/history'} >Historial</Link>
        {/* <button className='bg-page-orange hover:bg-page-orange-hover rounded-full px-2 py-1 mx-2' onClick={handleOrdersView}>orders</button> */}
      </div>
     </header>
      <section className="h-[512px] m-auto overflow-y-auto border-2 border-solid border-black">
        {
          // view.togo
          //   ? (togos
                togos?.map(togo => <OrderToGo
                  key={togo.id}
                  orderData={togo}
                  removeTogo={handleTogos}
                />)
               // : null)
            // : (orders
            //     ? orders.map(order => <Order
            //       dateTime={order.dateTime}
            //       id={order.id}
            //       table={order.table}
            //       waiter={order.waiter ?? 'Ramón'}
            //       products={order.products}
            //       key={order.id}
            //     />)
            //     : null)
        }
      </section>
    </>
  )
}

export interface TogoData {
  id: string | UUID
  user: {
    home: string
    street: number | string
    localidad: string
    id: UUID | string
  }
  status: OrderStatus
  dateTime: string
}

export interface OrderData {
  table: number | string
  waiter: string
  products: Array<{
    name: string
    amout: number | string
  }>
  id: string | UUID
  dateTime: string
}

// const Order = (order: OrderData): JSX.Element => {
//   return (
//     <div className='flex justify-around h-1/5 items-center bg-gray-300'>
//       <div className='w-1/2'>
//         <span className='px-2'>Pedido: {order.id}</span>
//         <span className='px-2'>Mesero: {order.waiter}</span>
//         <span className='px-2'>Mesa: {order.table}</span>
//       </div>
//       <div className='flex justify-end'>
//         <button title='See order description' className='px-2 bg-page-orange hover:bg-page-orange-hover rounded-full py-1 mx-2'>
//           <Description />
//         </button>
//         <button title='Send order to kitchen' className='px-2 bg-page-orange hover:bg-page-orange-hover rounded-full py-1 mx-2'>
//           <Kitchen/>
//         </button>
//         <button title='Delete Order' className='px-2 bg-page-orange hover:bg-page-orange-hover rounded-full py-1 mx-2'>
//           <Bin />
//         </button>
//       </div>
//     </div>
//   )
// }

const OrderToGo = ({ orderData, removeTogo }: { orderData: TogoData, removeTogo: (id: UUID) => void }): JSX.Element => {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(orderData.status ?? OrderStatus.PREP)
  const supabase = useRef(createClientComponentClient())
  const handleClickOrderStatus = (status: OrderStatus): (() => void) => () => {
    if (status === currentStatus) return
    setCurrentStatus(status)
    if (status === OrderStatus.DELIVERED) {
      removeTogo(orderData.id as UUID)
    }
    setTimeout(async () => {
      await supabase.current.from('togo').update({ status }).eq('id', orderData.id)
    }, 600)
  }
  const { user: { home, street, localidad } } = orderData
  return (

      <ul className='flex justify-around items-center bg-gray-300 px-4 border-b-2 border-solid border-black py-2'>
        <li>Pedido: {orderData.id.slice(-4)}</li>
        {localidad && <li>Dirección: {`${localidad}, ${street} #${home}`}</li>}
        <li>
          <ul className='flex items-center justify-around  bg-gray-300'>
            {Object.values(OrderStatus).map((status, i) => (

              <li key={status} onClick={handleClickOrderStatus(status)}><button className={`${currentStatus === status ? 'bg-page-orange-hover' : 'bg-page-orange'} hover:bg-page-orange-hover rounded-full px-2 py-1`} title={`Set order in status: ${status}`}>{status.toLocaleUpperCase()}</button></li>
            ))}
          </ul>
        </li>
        <li>
          <button className='mx-3 bg-page-orange hover:bg-page-orange-hover w-10 h-10 flex items-center justify-center rounded-full' title='See full order description'>
            <Description />
          </button>
        </li>
      </ul>

  )
}
