import { type User, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useRef, useState } from 'react'
import { type toast } from 'sonner'

export default function useAccountInfo (): {
  userAccountInfo: Record<string, string>
  handleChange: (e: any, formToast?: typeof toast) => void
  enableUserEdit: boolean
  handleSubmit: (e: any, formToast: typeof toast) => void
  handleEnableUserEdit: (state: boolean) => void
} {
  const defaultLocalidadRef = useRef('Altavela')
  const userRef = useRef<User>()
  const supabaseRef = useRef(createClientComponentClient())
  const [enableUserEdit, setEnableUserEdit] = useState(false)
  const [userAccountInfo, setUserAccountInfo] = useState<Record<string, string>>({
    phone: '',
    street: '',
    localidad: 'Altavela',
    home: ''
  })

  useEffect(() => {
    const getAddress = async (): Promise<any> => {
      const { data: { user } } = await supabaseRef.current.auth.getUser()
      userRef.current = user!
      const { data: address } = await supabaseRef.current.from('users').select('phone, street, localidad, home').eq('id', user!.id).single()
      return address
    }

    getAddress().then(info => {
      setUserAccountInfo({
        phone: info.phone ?? '',
        street: info.street ?? '',
        localidad: info.localidad ?? 'Altavela',
        home: info.home ?? ''
      })
    }).catch(e => { console.error(e) })
  }, [])

  const handleChange = (e: any, formToast?: typeof toast): void => {
    const { name, value } = e.target
    if (name === 'phone' && value.length > 10) return
    setUserAccountInfo((prev: any) => {
      return ({ ...prev, [name]: value })
    })
    if (name === 'localidad' && !defaultLocalidadRef.current.toLowerCase().startsWith((value as string).toLowerCase())) {
      formToast!.error('Por el momento solo contamos con envíos en Altavela')
    }
  }

  const handleSubmit = (e: any, formToast: typeof toast): void => {
    e.preventDefault()
    setEnableUserEdit(false)
    const { name } = e.target.dataset
    if (name === 'general') {
      console.log('here', userRef.current!.id)
      // editar usuario
      const { phone } = userAccountInfo
      /* eslint-disable-next-line */
     ;(async() => {
        console.log(phone)
        const { error } = await supabaseRef.current.from('users').update({ phone }).eq('id', userRef.current!.id).select()
        if (error) {
          formToast.error('Error actualizando la información, intentelo mas tarde')
        } else {
          formToast.success('Información actualizada correctamente')
        }
      })()
    }

    if (name === 'address') {
      // editar address

      const { home, street, localidad } = userAccountInfo
      /* eslint-disable-next-line */
      ;(async() =>  {
        const { error } = await supabaseRef.current.from('users').update({ home, street, localidad }).eq('id', userRef.current!.id).select()
        if (error) {
          formToast.error('Error actualizando la información, intentelo mas tarde')
        } else {
          formToast.success('Información actualizada correctamente')
        }
      })()
      // Actualizar address data
    }
  }

  const handleEnableUserEdit = (state: boolean): void => {
    setEnableUserEdit(state)
  }

  return { handleChange, userAccountInfo, enableUserEdit, handleSubmit, handleEnableUserEdit }
}
