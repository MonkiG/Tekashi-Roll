import { type SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { type TogoData } from '../admin/orders/page'
import { type UUID } from 'crypto'

export default function useTogos (supabase: SupabaseClient): { togos: TogoData[] | undefined, handleTogos: (id: UUID) => void } {
  const [togos, setTogos] = useState<TogoData[]>()
  useEffect(() => {
    const date = new Date()
    const fetchTogos = async (): Promise<any[]> => {
      const { data } = await supabase.from('togo').select('id, detail, total, status, user:users!inner(*)').lte('date_time', date.toISOString()).not('status', 'eq', 'delivered')
      return data ?? []
    }

    fetchTogos().then((togos: any[]) => {
      setTogos(togos)
    }).catch(e => { console.error(e) })
  }, [])

  useEffect(() => {
    const realtime = supabase
      .channel('togo')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'togo' }, async (payload) => {
        const { user_id: userId, id, detail, status, total, date_time: dateTime } = payload.new

        const { data: user } = await supabase.from('users').select('*').eq('id', userId).single()

        setTogos(prev => ([...prev!, { detail, id, status, total, dateTime, user: { id: user.id, localidad: user.localidad, street: user.street, home: user.home } }]))
        /* eslint-disable-next-line */
      })
      .subscribe()

    return () => { realtime.unsubscribe().catch(e => { console.error(e) }) }
  })

  const handleTogos = (id: UUID): void => {
    setTogos(prev => {
      if (!prev) return []
      return prev.filter(x => x.id !== id)
    })
  }
  return ({ togos, handleTogos })
}
