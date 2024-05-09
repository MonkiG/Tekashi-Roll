'use client'

import { type UUID } from 'crypto'
import TogoComponent from './Togo'
import Link from 'next/link'
import Missing from '@/app/components/Missing'
import { type User, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

interface Product {
  id: string
  name: string
  price: number
  enabled: boolean
  img_url: string
  categories: {
    name: string
  }
  category_id: string
  description: string
  amount: number
}

export interface GroupedData {
  id: UUID
  total: number
  status: string
  products: Product[]
}

export default function TogoClientPage ({ user }: { user: User }): JSX.Element {
  const [parseredTogos, setParseredTogos] = useState<any[]>([])

  useEffect(() => {
    ;(async () => {
      const supabase = createClientComponentClient()
      const { data: togos } = await supabase.from('product_togo').select('togo!inner(total, id, status), products(*, categories(name))').eq('togo.user_id', user.id).not('togo.status', 'eq', 'delivered')

      if (togos) {
        setParseredTogos((prev: any[]) => {
          return togos.reduce((prev, curr) => {
            const { togo, products } = curr
            if (togo) {
              const existingTogo = prev.find((item: any) => item.id === togo.id)
              if (!existingTogo) {
                prev.push({
                  status: togo.status,
                  id: togo.id as UUID,
                  total: togo.total,
                  products: [products]
                })
              } else {
                existingTogo.products.push(products)
              }
            }

            return prev
          }, [])
        })
      }
    })().catch(e => { console.error(e) })
  }, [])

  useEffect(() => {
    const supabase = createClientComponentClient()
    const realtime = supabase
      .channel('togo')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'togo' }, (payload) => {
        const { status, id } = payload.new
        setParseredTogos(prev => {
          return prev.map(product => {
            if (product.id === id) {
              // Si encontramos el producto, actualizamos su estado y lo devolvemos
              return { ...product, status }
            }
            // Si no es el producto que se actualizó, devolvemos el producto sin cambios
            return product
          })
        })
      }).subscribe()

    return () => { realtime.unsubscribe().catch(e => { console.error(e) }) }
  }, [])
  return (<section className={`w-full h-full flex flex-col  ${parseredTogos && parseredTogos.length <= 0 && 'justify-between'} grow relative`}>
    <h2 className="text-center text-2xl py-1">Pedidos</h2>
    <Link href={`/user/${user.id}/togo/history`} className='absolute top-0 right-5 underline py-1'>Ver historial de pedidos</Link>
    {parseredTogos && parseredTogos.length > 0 && parseredTogos?.map((togo) => {
      return <TogoComponent key={togo.id} data={togo}/>
    })}
    {
      parseredTogos && parseredTogos.length <= 0 && <div>
         <Missing className='h-full flex flex-col items-center justify-center grow' text='Hoy no cuentas con pedidos pendientes'/>
      </div>
    }
  </section>)
}
