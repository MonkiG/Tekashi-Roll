import AuthForm from '../AuthForm'
import { loginUser } from '@/services/AuthServices'

export default function Login (): JSX.Element {
  return (
        <>
            <h2 className="uppercase text-2xl m-5 font-bold">Iniciar sesión</h2>
            <AuthForm
                data={{
                  mail: '',
                  password: ''
                }}
                handleAuth={loginUser}
            />
        </>
  )
}
