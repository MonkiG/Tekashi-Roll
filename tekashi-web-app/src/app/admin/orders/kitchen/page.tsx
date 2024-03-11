import { OrderStatus } from '@/app/helpers/OrderStatus'

export default function Kitchen (): JSX.Element {
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

const Order = (id: any): JSX.Element => {
  return (
        <article className="bg-gray-300 h-1/4 border-2 border-solid border-orange-200">
            <div>
                <span className='px-5'>Pedido: </span>
                <span className='px-5'>Mesero: </span>
                <span className='px-5'>Mesa: </span>
            </div>
            <div className='px-5'>
                Detalle:
            </div>
        </article>
  )
}
