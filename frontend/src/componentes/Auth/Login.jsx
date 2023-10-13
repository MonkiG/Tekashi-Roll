import HeaderAuth from './HeaderAuth'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Login () {
  const [formData, setFormData] = useState({
    mail: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    /* REQUEST PARA LOGIN */
  }

  return (
    <section className='h-screen'>
      <HeaderAuth />
        <main className='overflow-hidden flex flex-col justify-center items-center min-h-screen'>
        <h2 className='uppercase text-2xl m-5 font-bold'>Login</h2>
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <input type="text" name="mail" placeholder='Correo' className='p-2 border-gray-200 border-2 my-2 w-72 rounded-sm' value={formData.mail} onChange={handleChange}/>
          <input type="password" name="password" placeholder='Contraseña' className='p-2 border-gray-200 border-2 my-2 w-72 rounded-sm' value={formData.password} onChange={handleChange}/>
          <Link to="/auth/signup" >Registrarse</Link>
          <button type="submit" className='p-2 w-full text-center bg-page-red hover:bg-page-red-hover rounded-sm text-page-orange my-10 rounded-sm'>Entrar</button>
        </form>
      </main>
    </section >
  )
}
