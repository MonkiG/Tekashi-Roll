'use client'

import Profile from './icons/Profile'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AppRoles } from '../helpers/AppRoles'
import { type User } from '../types'

export default function UserProfile ({ user }: { user: User }): JSX.Element {
  const [showProfilePreview, setShowProfilePreview] = useState(false)
  const supabase = createClientComponentClient()
  const router = useRouter()
  const handleSignOut = async (): Promise<void> => {
    await supabase.auth.signOut()
    router.refresh()
  }
  return (
    <>
        <button
            className='hover:bg-page-black-hover p-2'
            onClick={() => { setShowProfilePreview(!showProfilePreview) }}
        >
            <Profile />
        </button>
        {
            showProfilePreview &&
            <section className='absolute bg-white right-[260px] top-12 z-10 min-h-80 min-w-80 max-h-[600px] rounded-sm flex flex-col'>
            <header className='relative bg-gray-300 font-[Lalezar] p-5'>
                <h3 className='text-center uppercase'>Nombre de usuario</h3>
                <button
                    className='absolute right-4 top-2 font-sans'
                    onClick={() => { setShowProfilePreview(false) }}
                >X</button>
            </header>
            <ul>
                <li><button onClick={handleSignOut}>Cerrar sesión</button></li>
                {
                    user.role === AppRoles.app_admin &&
                    <li><Link href={'/admin'}>Panel administrador</Link></li>
                }
            </ul>
        </section>
        }
    </>
  )
}
