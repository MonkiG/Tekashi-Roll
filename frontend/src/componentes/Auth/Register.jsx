import HeaderAuth from './HeaderAuth'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Register () {
  const [formData, setFormData] = useState({
    mail: '',
    password: '',
    name: '',
    lastName: '',
    phone: ''

  })

  const [showWarn, setShowWarn] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let sendRequest = true
    const formValues = Object.values(formData)
    formValues.forEach(value => {
      if (value === '') {
        setShowWarn(true)
        sendRequest = false
      }
    })

    if (sendRequest === false) return

    /* REQUEST PARA registro */
    // Tengo que guardan
    // Redireccion home
  }

  return (
    <section className='h-screen'>
      <HeaderAuth />
        <main className='overflow-hidden flex flex-col justify-center items-center min-h-screen'>
        <h2 className='uppercase text-2xl m-5 font-bold'>registro</h2>
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <input type="text" name="mail" placeholder='Correo' className='p-2 border-gray-200 border-2 my-2 w-72 rounded-sm' value={formData.mail} onChange={handleChange} required/>
          <input type="password" name="password" placeholder='Contraseña' className='p-2 border-gray-200 border-2 my-2 w-72 rounded-sm' value={formData.password} onChange={handleChange} required/>
          <input type="text" name="name" placeholder='Nombre' className='p-2 border-gray-200 border-2 my-2 w-72 rounded-sm' value={formData.name} onChange={handleChange} required/>
          <input type="text" name="lastName" placeholder='Apellido(s)' className='p-2 border-gray-200 border-2 my-2 w-72 rounded-sm' value={formData.lastName} onChange={handleChange} required/>
          <input type="tel" name="phone" placeholder='Telefono' className='p-2 border-gray-200 border-2 my-2 w-72 rounded-sm' value={formData.phone} onChange={handleChange} required/>
          {showWarn && <span className='text-red-400'>Llene todos los campos</span> }
          <Link to="/auth/login" >Iniciar sesion</Link>
          <button type="submit" className='p-2 w-full text-center bg-page-red hover:bg-page-red-hover text-page-orange my-10 rounded-sm'>Registrarse</button>
        </form>
      </main>
    </section >
  )
}
