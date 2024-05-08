import { type SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { type OrderData } from '../admin/orders/page'

export default function useOrders (supabase: SupabaseClient): { orders: OrderData[] | undefined } {
  const [orders, setOrders] = useState<OrderData[]>()

  useEffect(() => {
    const date = new Date()
    const fetchOrders = async (): Promise<any[]> => {
      const { data } = await supabase.from('orders').select('id, products, table').lte('date_time', date.toISOString())
      return data ?? []
    }
    fetchOrders().then(((orders: OrderData[]) => {
      setOrders(orders)
    })).catch(e => { console.error(e) })
  }, [])

  useEffect(() => {
    const realtime = supabase
      .channel('orders')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
        const { id, products, table } = payload.new

        setOrders((prev: any) => [...prev, { id, products, table }])
      })
      .subscribe()

    return () => { realtime.unsubscribe().catch(e => { console.error(e) }) }
  }, [])

  return ({ orders })
}
