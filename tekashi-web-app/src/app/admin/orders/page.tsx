import { OrderStatus } from '@/app/helpers/OrderStatus'
import Description from '@/app/components/icons/Description'
import { type UUID } from 'crypto'

export default function Orders (): JSX.Element {
  return (
    <>
      <h2 className="mb-2 mt-0 text-center font-bold text-xl">Pedidos</h2>
      <section className="h-[512px] w-[1029px] m-auto overflow-y-auto">
        {Array.from({ length: 10 }, (_, i) => (

          <Order key={crypto.randomUUID()} id={`Order ${i}`} orderNumber={i} user='Ramón Hernández' status={OrderStatus.PLACED}/>

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

const Order = (orderData: OrderData): JSX.Element => {
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
