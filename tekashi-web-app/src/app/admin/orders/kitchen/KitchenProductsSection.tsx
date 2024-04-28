'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

export default function KitchenProductsSection (): JSX.Element {
  const [products, setProducts] = useState<any[]>()
  useEffect(() => {
    const supabase = createClientComponentClient()
    const realTime = supabase
      .channel('product_togo')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'product_togo'
        },
        (payload) => {
        // const {id, togo_id, product_id, product_amount} = payload.new
          console.log(payload.new)
        })

    return () => { realTime.unsubscribe().catch(e => { console.error(e) }) }
  }, [])
  return (
        <section className="h-[512px] w-[1029px] m-auto overflow-y-auto">
        {products
          ? products.map(product => (

            <Order key={crypto.randomUUID()} id={`Order ${i}`} orderNumber={i} user='Ramón Hernández' status={OrderStatus.PLACED}/>

          ))
          : null}
         </section>
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
