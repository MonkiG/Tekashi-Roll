import AuthForm from '../AuthForm'
export default async function Login (): Promise<JSX.Element> {
  return (
        <>
            <h2 className="uppercase text-2xl m-5 font-bold">Iniciar sesión</h2>
            <AuthForm
                data={{
                  email: '',
                  password: ''
                }}
            />
        </>
  )
}
