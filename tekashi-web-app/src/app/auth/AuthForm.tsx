'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { inputTypes, placeholders } from '@/app/helpers/FormHelpers'
import { type AuthType, type UserLoginWithPasswordData, type UserSignUp } from '@/app/types'
import useAuthForm from '@/app/hooks/useAuthForm'
import { Toaster, toast } from 'sonner'
import { signInWithGoogle } from '../services/authHandlers'

/** TODO
 * Redireccionar al home o mostrar modal dependiendo el caso
 */
export default function AuthForm ({
  data
}: {
  data: UserLoginWithPasswordData | UserSignUp
}): JSX.Element {
  const path = usePathname().split('/')[2] as AuthType
  const { handleChange, handleSubmit, formData, loading } = useAuthForm(data, path, toast)

  return (
    <>
      <Toaster richColors position="top-right"/>
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
                    required
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
          <button type="submit" className='p-2 w-full text-center bg-page-red hover:bg-page-red-hover  text-page-orange mt-10 mb-2 rounded-sm'>
            {
              loading
                ? 'Enviando...'
                : path === 'login'
                  ? 'Iniciar sesión'
                  : 'Registrarse'
            }
          </button>
          <div className="px-6 sm:px-0 max-w-sm">
            <button
              onClick={signInWithGoogle}
              type="button"
              className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2">
                <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                  </svg>Inicia sesión con Google
                  <div></div>
            </button>
          </div>
      </form>
    </>
  )
}
