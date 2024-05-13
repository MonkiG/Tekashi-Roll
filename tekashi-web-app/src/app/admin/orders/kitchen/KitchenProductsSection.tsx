'use client'
import { OrderStatus } from '@/app/helpers/OrderStatus'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type UUID } from 'crypto'
import { useEffect, useRef, useState } from 'react'

export default function KitchenProductsSection (): JSX.Element {
  const [products, setProducts] = useState<any[]>([])
  const supabaseRef = useRef(createClientComponentClient())
  useEffect(() => {
    ;(async () => {
      const { data: todayProducts } = await supabaseRef.current.from('product_togo').select('amount:product_amount, product:products(*), togo:togo_id!inner(*)').not('togo_id.status', 'eq', 'delivered').not('togo_id.status', 'eq', 'delivering')
      if (todayProducts) {
        setProducts(todayProducts.flatMap(x => {
          if (x.amount > 1) {
            const products = []
            for (let i = 0; i < x.amount; i++) {
              products.push({ togoId: x.togo.id, product: x.product })
            }
            return products
          } else {
            return ({ togoId: x.togo.id, product: x.product })
          }
        }))
      }
    })().catch(e => { console.error(e) })
  }, [])

  useEffect(() => {
    const realTime = supabaseRef.current
      .channel('product_togo')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'product_togo'
        },
        async (payload) => {
          const { id, togo_id, product_id, product_amount } = payload.new

          for (let i = 0; i < product_amount; i++) {
            const { data: product } = await supabaseRef.current.from('products').select('*').eq('id', product_id).single()

            setProducts(prev => [...prev, { togoId: togo_id, product }])
          }
        })
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'togo'
        },
        async (payload) => {
          const { id: togoId, status } = payload.new

          if (status === OrderStatus.DELIVERING || status === OrderStatus.DELIVERED) {
            setProducts(prev => {
              return prev.filter(x => x.togoId !== togoId)
            })
          }
          // const { data: product } = await supabaseRef.current.from('products').select('*').eq('id', product_id).single()

        // setProducts(prev => [...prev, product])
        }
      )
      .subscribe()

    return () => { realTime.unsubscribe().catch(e => { console.error(e) }) }
  }, [])

  return (
    <section className="h-[512px] w-full overflow-y-auto bg-gray-300">
      {products.length > 0
        ? products.map(product => <Order key={crypto.randomUUID()} product={product}/>)
        : null}
    </section>
  )
}

const Order = ({ product }: { product: any }): JSX.Element => {
  return (
          <article className="bg-gray-300 px-2 border-2 border-solid border-orange-200">
            <h2 className='text-2xl'>Producto: {product.product.name}</h2>
            <h2>Pedido: {product.togoId.slice(-4)}</h2>
              {/* <div>
                  <span className='px-5'>Pedido: </span>
                  <span className='px-5'>Mesero: </span>
                  <span className='px-5'>Mesa: </span>
              </div>
              <div className='px-5'>
                  Detalle:
              </div> */}
          </article>
  )
}
