'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { inputTypes, placeholders } from '@/app/helpers/FormHelpers'
import { type AuthType, type UserLoginWithPasswordData, type UserSignUp } from '@/app/types'
import useAuthForm from '@/app/hooks/useAuthForm'

/** TODO
 * Redireccionar al home o mostrar modal dependiendo el caso
 */
export default function AuthForm ({
  data
}: {
  data: UserLoginWithPasswordData | UserSignUp
}): JSX.Element {
  const path = usePathname().split('/')[2] as AuthType
  const { handleChange, handleSubmit, formData } = useAuthForm(data, path)

  return (
        <form className="flex flex-col" onSubmit={handleSubmit}>
            {
                Object.keys(data).map((input, i) => {
                  return <input
                        key={input}
                        name={input}
                        type={inputTypes[input] ?? 'text'}
                        placeholder={placeholders[input]}
                        value={formData[input as keyof typeof data]}
                        onChange={handleChange}
                        className='p-2 border-gray-200 border-2 my-2 w-72 rounded-sm'
                    />
                })
            }
            <Link
                href={`/auth/${path === 'login' ? 'signup' : 'login'}`}
                className="underline text-sm py-2"
            >
                {path === 'login' ? '¿No tienes cuenta? ¡Crea una!' : '¿Ya tienes una cuenta? ¡Inicia sesión!'}
            </Link>
            <button type="submit" className='p-2 w-full text-center bg-page-red hover:bg-page-red-hover  text-page-orange my-10 rounded-sm'>{path === 'login' ? 'Iniciar sesión' : 'Registrarse'}</button>
        </form>
  )
}
