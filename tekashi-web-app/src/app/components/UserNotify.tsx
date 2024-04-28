'use client'
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type User } from '../types'
import Ring from './icons/Ring'
import { useState } from 'react'

export default function UserNotify ({ user }: { user: User }): JSX.Element {
  const [showNotify, setShowNotify] = useState(false)
  const [showBullet, setShowBullet] = useState(true)
  //   const handleNotifies = (): void => {

  //   }
  //   useEffect(() => {
  //     const supabase = createClientComponentClient()
  //     const listener = supabase
  //       .channel('')
  //       .on('postgres_changes', { event: 'INSERT', schema: 'public', table: '' }, handleNotifies)
  //       .subscribe()

  //     return () => {
  //       listener.unsubscribe().catch(e => { console.error(e) })
  //     }
  //   }, [])
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
                    <li>Notificacion</li>
                </ul>
            </section>
        }
    </>
  )
}
