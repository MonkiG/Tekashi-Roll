import { type SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { type TogoData } from '../admin/orders/page'
import { type User } from '../types'

export default function useTogos (supabase: SupabaseClient): { togos: TogoData[] | undefined } {
  const [togos, setTogos] = useState<TogoData[]>()
  useEffect(() => {
    const date = new Date()
    const fetchTogos = async (): Promise<any[]> => {
      const { data } = await supabase.from('togo').select('id, detail, total, status, user:users(id)').lte('date_time', date.toISOString()).not('status', 'eq', 'delivered')
      return data ?? []
    }

    fetchTogos().then((togos: any[]) => {
      setTogos(togos)
    }).catch(e => { console.error(e) })
  }, [])

  useEffect(() => {
    const realtime = supabase
      .channel('togo')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'togo' }, (payload) => {
        const { user_id: userId, id, detail, status, total, date_time: dateTime } = payload.new

        /* eslint-disable-next-line */
        setTogos(prev => ([...prev!, { detail, id, status, total, dateTime, user: { id: userId } as User }]))
      })
      .subscribe()

    return () => { realtime.unsubscribe().catch(e => { console.error(e) }) }
  })
  return ({ togos })
}
