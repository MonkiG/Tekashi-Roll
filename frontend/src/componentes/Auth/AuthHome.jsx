import HeaderAuth from './HeaderAuth'
import { Link } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import { login, signup } from '../../services/Auth.services'
import useLoader from '../../hooks/useLoader'

export default function AuthHome ({ typeForm, initialFormData }) {
  const { isLoading, activeLoading, deactivateLoading } = useLoader()
  const { formHandleChange, data, showWarn, validateForm, resetForm } = useForm(initialFormData)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const sendRequest = validateForm()

    if (sendRequest === false) return

    activeLoading()
    try {
      if (typeForm === 'register') await signup(data)
      if (typeForm === 'login') await login(data)
    } catch (e) {
      console.log(e)
    } finally {
      deactivateLoading()
    }
    resetForm()
  }

  return (
    <section className='h-screen'>
    <HeaderAuth />
    <main className='overflow-hidden flex flex-col justify-center items-center min-h-screen'>
      <h2 className='uppercase text-2xl m-5 font-bold'>{typeForm === 'register' ? 'Registro' : typeForm === 'login' ? 'Login' : null}</h2>
      {isLoading && <p>Cargando...</p>}
      {
        isLoading === false &&
        <AuthForm data={initialFormData} formHandleChange={formHandleChange} handleSubmit={handleSubmit} typeForm={typeForm}>
          {showWarn && <span className='text-red-400'>Llene todos los campos</span> }
        </AuthForm>
      }
    </main>
  </section >
  )
}

const AuthForm = ({ data, children, formHandleChange, handleSubmit, typeForm }) => {
  const type = {
    password: 'password',
    phone: 'tel'
  }
  const placeholders = {
    mail: 'Correo',
    password: 'Contraseña',
    name: 'Nombre',
    lastName: 'Apellidos(s)',
    phone: 'Telefono'
  }
  return (
    <form className='flex flex-col' onSubmit={handleSubmit}>
      {Object.keys(data).map((input, i) => {
        return <input key={input} name={input} type={type[input] || 'text'} placeholder={placeholders[input]} className='p-2 border-gray-200 border-2 my-2 w-72 rounded-sm' value={data.input} onChange={formHandleChange}/>
      })}
      {children}
      <Link to={`/auth/${typeForm === 'register' ? 'login' : 'signup'}`}>{(typeForm === 'register' && 'Iniciar sesion') || (typeForm === 'login' && 'Registrarse')}</Link>
      <button type="submit" className='p-2 w-full text-center bg-page-red hover:bg-page-red-hover  text-page-orange my-10 rounded-sm'>{(typeForm === 'register' && 'Registrarse') || (typeForm === 'login' && 'Iniciar sesion')}</button>
    </form>
  )
}

/**
 * {(isLoading === false && typeForm === 'register') &&
        <form className='flex flex-col' onSubmit={handleSubmit}>
            <input type="text" name="mail" placeholder='Correo' className='p-2 border-gray-200 border-2 my-2 w-72 rounded-sm' value={data.mail} onChange={formHandleChange} required/>
            <input type="password" name="password" placeholder='Contraseña' className='p-2 border-gray-200 border-2 my-2 w-72 rounded-sm' value={data.password} onChange={formHandleChange} required/>
            <input type="text" name="name" placeholder='Nombre' className='p-2 border-gray-200 border-2 my-2 w-72 rounded-sm' value={data.name} onChange={formHandleChange} required/>
            <input type="text" name="lastName" placeholder='Apellido(s)' className='p-2 border-gray-200 border-2 my-2 w-72 rounded-sm' value={data.lastName} onChange={formHandleChange} required/>
            <input type="tel" name="phone" placeholder='Telefono' className='p-2 border-gray-200 border-2 my-2 w-72 rounded-sm' value={data.phone} onChange={formHandleChange} required/>
            {showWarn && <span className='text-red-400'>Llene todos los campos</span> }
            <Link to="/auth/login" >Iniciar sesion</Link>
            <button type="submit" className='p-2 w-full text-center bg-page-red hover:bg-page-red-hover text-page-orange my-10 rounded-sm'>Registrarse</button>
        </form>
      }

      {(isLoading === false && typeForm === 'login') &&
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <input type="text" name="mail" placeholder='Correo' className='p-2 border-gray-200 border-2 my-2 w-72 rounded-sm' value={data.mail} onChange={formHandleChange}/>
          <input type="password" name="password" placeholder='Contraseña' className='p-2 border-gray-200 border-2 my-2 w-72 rounded-sm' value={data.password} onChange={formHandleChange}/>
          {showWarn && <span className='text-red-400'>Llene todos los campos</span> }
          <Link to="/auth/signup" >Registrarse</Link>
          <button type="submit" className='p-2 w-full text-center bg-page-red hover:bg-page-red-hover  text-page-orange my-10 rounded-sm'>Entrar</button>
        </form>
      }
 */
