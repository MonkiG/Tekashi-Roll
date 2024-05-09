'use client'
import { useContext } from 'react'
import { FilterContext } from './FilterContext'

export default function Filter (): JSX.Element {
  const handleOnSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
  }
  const { handleFilters, filters, categories } = useContext(FilterContext)
  return (
    <form onClick={handleOnSubmit} className='flex gap-5 justify-start border-solid border-page-orange border-2 rounded-sm p-1'>
      <select name="category" onChange={handleFilters} className=' outline-none'>
        <option value="any">Selecciona una categoria</option>
        {
          categories?.map(category => <option key={category.id} value={category.id}>{category.name}</option>)
        }
      </select>
      <label htmlFor="price">Precio: </label>
      <input type="number" name="price" placeholder='$300 MXN' className='text-start px-2 outline-none w-1/2 md:w-full' onChange={handleFilters} value={filters.price}/>
      <label htmlFor="name">Producto: </label>
      <input type="text" name="name" placeholder='Monkey Roll' className='text-start px-2 outline-none w-1/2 md:w-full' onChange={handleFilters} value={filters.name}/>
    </form>
  )
}
