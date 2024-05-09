'use client'

import { useContext, useState } from 'react'
import { CartContext } from '../(client-view)/CartContext'
import { Toaster, toast } from 'sonner'

export default function Form ({ user }: { user: any }): JSX.Element {
  const { userAccountInfo, handleChange, enableUserEdit, handleSubmit, handleEnableUserEdit } = useContext(CartContext)

  const [data] = useState({
    name: `${user.name} ${user.lastName}`,
    localidad: 'Altavela',
    ...user
  })

  const handleClick = (e: any): void => {
    const { name } = e.target

    if (name === 'enable-general') {
      handleEnableUserEdit(!enableUserEdit)
    }
  }

  const handleFormChange = (e: any): void => {
    handleChange(e)
  }

  return (<div className='flex w-full h-72'>
    <Toaster richColors position='top-center'/>
    <form method='POST' data-name='general' onSubmit={(e: any) => { handleSubmit(e, toast) }} className='flex flex-col w-full h-full justify-start items-start self-center '>
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
      <label htmlFor="phone">Número de teléfono</label>
      <input
            type="tel"
            name='phone'
            value={userAccountInfo.phone}
            disabled={!enableUserEdit}
            className='bg-gray-300 w-full text-sm px-2'
            onChange={handleFormChange}
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

    <form onSubmit={(e: any) => { handleSubmit(e, toast) }} data-name="address" method='POST' className='flex flex-col w-full h-full justify-start items-start self-center border-l-2 border-gray-300'>
      <h3 className='my-4 text-center w-full border-b-2 border-gray-300'>Dirección</h3>
      <label htmlFor="state">Municipio</label>
      <input type="text" value={'Bahía de Banderas'} readOnly className='bg-gray-300 w-full text-sm px-2'/>
      <label htmlFor="localidad">Localidad</label>
      <input
            name='localidad'
            type="text"
            value={userAccountInfo.localidad}
            className='w-full text-sm px-2 bg-gray-200'
            required
            onChange={(e) => { handleChange(e, toast) }}
        />
      <label htmlFor="street">Calle</label>
      <input type="text" value={userAccountInfo.street} name='street' className='w-full text-sm px-2 bg-gray-200' required
            onChange={handleFormChange}
        />
      <label htmlFor="home">Numero</label>
      <input type="number" value={userAccountInfo.home} name='home' className='w-full text-sm px-2 bg-gray-200' required
            onChange={handleFormChange}
        />
      <button type='submit' className='w-full text-center'>Actualizar</button>
    </form>
  </div>)
}
