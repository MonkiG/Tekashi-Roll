'use client'

import { useEffect, useState } from 'react'
import { type GroupedData } from './page'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type OrderStatus } from '@/app/helpers/OrderStatus'

export default function TogoComponent ({ data }: { data: GroupedData }): JSX.Element {
  const [status, setStatus] = useState<OrderStatus>(data.status as OrderStatus)
  const statusDictionary: Record<string, string> = {
    preparing: 'En preparación',
    delivering: 'En reparto',
    delivered: 'Entregado'
  }
  useEffect(() => {
    const supabase = createClientComponentClient()
    const realtime = supabase
      .channel('togo')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'togo' }, (payload) => {
        const { status, id } = payload.new
        console.log(payload)
        if (id === data.id) {
          setStatus(status as OrderStatus)
        }
      }).subscribe()

    return () => { realtime.unsubscribe().catch(e => { console.error(e) }) }
  }, [])

  return (
        <article className='px-5'>
            <h2>Orden: {data.id.slice(-4)}</h2>

            <div className='flex justify-between'>
                <div>
                    Total: <span>$ {data.total} MXN</span>
                </div>
                <div>
                    status: <span
                        className={
                            `${status === 'preparing' && 'bg-page-red'} 
                            ${status === 'delivering' && 'bg-page-orange'}
                            ${status === 'delivered' && 'bg-green-700'}
                            rounded-full py-1 px-2 text-white`
                        }>{statusDictionary[status]}</span>
                </div>
                <div>

                    productos: <span>{data.products.reduce((prev, curr) => prev + curr.amount, 0) || data.products.length}</span>
                </div>
            </div>

        </article>
  )
}
