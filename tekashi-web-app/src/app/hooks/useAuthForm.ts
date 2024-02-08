import { useState } from 'react'
import { type AuthType, type UserLoginWithPasswordData, type UserSignUp } from '@/app/types'
import { useRouter } from 'next/navigation'

import authHandlers from '@/app/services/authHandlers'
import dotenvConfig from '../helpers/dotenvConfig'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function useAuthForm (
  data: UserLoginWithPasswordData | UserSignUp,
  path: AuthType
): {
    formData: UserLoginWithPasswordData | UserSignUp
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e: React.FormEvent) => Promise<void>
  } {
  const [formData, setFormData] = useState<UserLoginWithPasswordData | UserSignUp>(data)
  const router = useRouter()
  const supabase = createClientComponentClient({
    supabaseKey: dotenvConfig.SUPABASE_ANON_KEY,
    supabaseUrl: dotenvConfig.SUPABASE_URL
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputName = e.target.name
    const inputValue = e.target.value
    setFormData(prevFormData => ({
      ...prevFormData,
      [inputName]: inputValue
    }))
  }
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    const authResult = await authHandlers(path, formData, supabase)
    if (path === 'login' && (authResult && 'userId' in authResult)) {
      router.push(`/user/${authResult.userId}`)
    }
  }

  return {
    formData,
    handleChange,
    handleSubmit
  }
}