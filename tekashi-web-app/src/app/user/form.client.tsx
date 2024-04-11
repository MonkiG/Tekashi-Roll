'use client'

import { useState } from 'react'

export default function Form ({ user }: { user: any }): JSX.Element {
  const [enableUserEdit, setEnableUserEdit] = useState(false)
  const [data, setData] = useState({
    name: `${user.name} ${user.lastName}`,
    localidad: 'Altavela',
    ...user
  })

  const handleChange = (e: any): void => {
    const { name, value } = e.target
    if (name === 'phone' && value.length > 10) return
    setData((prev: any) => {
      return { ...prev, [name]: value }
    })
  }

  const handleClick = (e): void => {
    const { name } = e.target

    if (name === 'enable-general') {
      setEnableUserEdit(!enableUserEdit)
    }
  }

  const handleSubmit = (e): void => {
    e.preventDefault()

    const { name } = e.target.dataset
    if (name === 'general') {
      // editar usuario
    }

    if (name === 'address') {
      // editar address

      const { home, street, localidad } = data
      // Actualizar address data
    }
  }

  return (<div className='flex w-full h-72'>
    <form method='POST' data-name='general' onSubmit={handleSubmit} className='flex flex-col w-full h-full justify-start items-start self-center '>
      <h3 className='my-4 text-center w-full border-b-2 border-gray-300'>Informacion general</h3>
      <label htmlFor="name">Nombre</label>
      <input
            type="text"
            name='name'
            value={data.name}
            disabled={!enableUserEdit}
            className='bg-gray-300 w-full text-sm px-2'
            onChange={handleChange}
        />
      <label htmlFor="phone">Número de tléfono</label>
      <input
            type="tel"
            name='phone'
            value={data.phone}
            disabled={!enableUserEdit}
            className='bg-gray-300 w-full text-sm px-2'
            onChange={handleChange}
        />
      <label htmlFor="email">Correo electrónico</label>
      <input
            type="email"
            name="email"
            value={data.email}
            disabled={!enableUserEdit}
            className='bg-gray-300 w-full text-sm px-2'
            onChange={handleChange}
        />
       {enableUserEdit && <button type='submit' className='w-full text-center'>Enviar</button>}
        <button onClick={handleClick} type='button' name='enable-general' className='w-full text-center'> {enableUserEdit ? 'Cancelar' : 'Editar'}</button>
    </form>

    <form onSubmit={handleSubmit} data-name="address" method='POST' className='flex flex-col w-full h-full justify-start items-start self-center border-l-2 border-gray-300'>
      <h3 className='my-4 text-center w-full border-b-2 border-gray-300'>Dirección</h3>
      <label htmlFor="state">Municipio</label>
      <input type="text" value={'Bahía de Banderas'} className='bg-gray-300 w-full text-sm px-2'/>
      <label htmlFor="localidad">Localidad</label>
      <input
            name='localidad'
            type="text"
            value={data.localidad}
            className='w-full text-sm px-2 bg-gray-200'
            required
            onChange={handleChange}
        />
      <label htmlFor="street">Calle</label>
      <input type="text" value={data.street} name='street' className='w-full text-sm px-2 bg-gray-200' required
            onChange={handleChange}
        />
      <label htmlFor="home">Numero</label>
      <input type="number" value={data.home} name='home' className='w-full text-sm px-2 bg-gray-200' required
            onChange={handleChange}
        />
      <button type='submit' className='w-full text-center'>Actualizar</button>
    </form>
  </div>)
}
