import AuthForm from '../AuthForm'

export default async function Signup (): Promise<JSX.Element> {
  return (
        <>
            <h2 className="uppercase text-2xl m-5 font-bold">Registro</h2>
            <AuthForm
                data={{
                  email: '',
                  password: '',
                  name: '',
                  lastName: '',
                  phone: ''
                }}
            />
        </>
  )
}
