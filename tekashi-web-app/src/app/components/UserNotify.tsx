'use client'// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type User } from '../types'
import Ring from './icons/Ring'
import { useEffect, useState } from 'react'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type OrderStatus } from '../helpers/OrderStatus'
import { type UUID } from 'crypto'

interface Notification {
  status: OrderStatus
  orderId: UUID
  id: UUID
}
export default function UserNotify ({ user }: { user: User }): JSX.Element {
  const [showNotify, setShowNotify] = useState(false)
  const [showBullet, setShowBullet] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const supabase = createClientComponentClient()
    const realtime = supabase
      .channel('togo_status')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'togo' }, (payload) => {
        const { status, id } = payload.new
        console.log(payload.new)
        setNotifications(prev => [...prev, { id: crypto.randomUUID() as UUID, orderId: id, status: status as OrderStatus }])
        setShowBullet(true)
      }).subscribe()

    return () => { realtime.unsubscribe().catch(e => { console.error(e) }) }
  }, [])

  const statusDictionary = {
    preparing: 'Tu orden esta en preparación',
    delivering: 'Tu orden esta en camino',
    delivered: 'Tu orden ha sido entregada'
  }
  return (
    <>
        <button
            className='hover:bg-page-black-hover p-2 relative'
            onClick={() => { setShowNotify(!showNotify); setShowBullet(false) }}
        >
            <Ring />
            {showBullet && <div className='bg-green-600 w-3 h-3 rounded-full absolute bottom-[10px] left-[5px] animate-pulse'></div>}
        </button>
        {showNotify &&
            <section className='absolute bg-white right-[240px] top-12 z-10 min-h-80 min-w-80 max-h-[600px] rounded-sm flex flex-col'>
                <header className='relative bg-gray-300 font-[Lalezar] p-5'>
                    <h3 className='text-center uppercase'>Notificaciones</h3>
                    <button
                        className='absolute right-4 top-2 font-sans'
                        onClick={() => { setShowNotify(false); setShowBullet(false) }}
                    >X</button>
                </header>
                <ul>
                    {notifications?.map(notification => (
                        <li className={
                            `${notification.status === 'preparing' && 'bg-page-red'} 
                            ${notification.status === 'delivering' && 'bg-page-orange'}
                            ${notification.status === 'delivered' && 'bg-green-700'}`}
                            key={notification.id}
                        >
                            Your order is {statusDictionary[notification.status]}
                        </li>
                    ))}
                </ul>
            </section>
        }
    </>
  )
}
