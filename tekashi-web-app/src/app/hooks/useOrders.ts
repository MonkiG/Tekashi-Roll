import { type SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { type OrderData } from '../admin/orders/page'

export default function useOrders (supabase: SupabaseClient): {
  orders: OrderData[] | undefined
  handleDeleteOrder: (id: any) => Promise<boolean>
  handleOrders: (orders: OrderData[]) => void
} {
  const [orders, setOrders] = useState<OrderData[]>()

  useEffect(() => {
    const date = new Date()
    const fetchOrders = async (): Promise<any[]> => {
      const { data } = await supabase.from('orders').select('id, products, table, waiter(*)')
      console.log(data)
      return data ?? []
    }
    fetchOrders().then(((orders: OrderData[]) => {
      setOrders(orders)
    })).catch(e => { console.error(e) })
  }, [])

  const handleOrders = (orders: OrderData[]): void => {
    setOrders(orders)
  }
  const handleDeleteOrder = async (id: any): Promise<boolean> => {
    const { data } = await supabase.from('orders').delete().eq('id', id).select()
    return Boolean(data)
  }
  useEffect(() => {
    const realtime = supabase
      .channel('orders')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, async (payload) => {
        console.log(payload)
        const { id, products, table, waiter } = payload.new
        const { data: dbWaiter } = await supabase.from('waiters').select('*').eq('id', waiter).single()
        console.log(dbWaiter)
        setOrders((prev: any) => [...prev, { id, products, table, waiter: dbWaiter }])
      })
      .subscribe()

    return () => { realtime.unsubscribe().catch(e => { console.error(e) }) }
  }, [])

  return ({ orders, handleDeleteOrder, handleOrders })
}
