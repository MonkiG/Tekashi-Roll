'use client'
import Modal from '@/app/components/Modal'
import { getAllCategories } from '@/app/services/categoriesServices'
import { type AddProduct, type Category } from '@/app/types'
import { uploadProductImage } from '@/app/services/imagesServices'

import { useEffect, useState, useRef } from 'react'
import { addProduct } from '@/app/services/productsServices'

export default function ProductModal ({ handleCloseModal }: { handleCloseModal: () => void }): JSX.Element {
  const [categories, setCategories] = useState<Category[] | null>()
  const [productData, setProductData] = useState<AddProduct>({
    name: '',
    price: '',
    description: '',
    categoryId: '',
    imgUrl: ''
  })
  const imgInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    getAllCategories().then(data => {
      console.log('useEffect activado')
      setCategories(data)
    }).catch(e => { console.error(e) })
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const name = e.target.name
    const value = e.target.value

    setProductData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const files = imgInputRef.current?.files
    if (!files) return
    const file = files[0]

    if (!file.type.startsWith('image/')) alert('El archivo debe ser una imagen')

    await uploadProductImage(file, productData.name)
    setProductData(prev => ({
      ...prev,
      imgUrl: `https://hrfopsbdnnjaxeedlnot.supabase.co/storage/v1/object/public/images/products/${prev.name}`
    }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const data = e.target.value
    console.log(data)
    setProductData(prevData => {
      return {
        ...prevData,
        categoryId: data
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (Object.values(productData).some(prop => prop === '')) return

    await addProduct(productData)
    console.log('Informacion enviada')
    handleCloseModal()
  }

  return (
    <>
       <Modal className='overflow-hidden flex flex-col justify-center items-center'>
            <form onSubmit={handleSubmit} className='w-3/4 h-5/6 bg-page-red border-3 border-page-orange border-solid relative'>
                <button className='absolute right-5 top-3 text-3xl' onClick={handleCloseModal} title='Close modal'>x</button>
                <input type="text" name='name' required placeholder='Nombre del producto' value={productData.name} onChange={handleInputChange}/>
                <input type="text" name='price' required placeholder='Precio del producto' value={productData.price} onChange={handleInputChange}/>
                <textarea className='w-3/4 resize-none' name="description" required placeholder='Descripción del producto' value={productData.description} onChange={handleInputChange}></textarea>
                <div className='flex flex-col h-1/2 bg-green-200'>
                    <label htmlFor="image" className='col-spab-2'>Selecciona la imagen del producto</label>
                    <input type="file" name="image" accept='image/*' ref={imgInputRef} onChange={handleFileChange} className='text-hidden text-transparent'/>
                </div>
                {
                    categories &&
                    <select name="category_id" required onChange={handleSelectChange}>
                        {categories.map(categorie => (
                            <option value={categorie.id} key={categorie.id}>{categorie.name}</option>
                        ))}
                    </select>
                }
                <button type='submit' className="p-1 text-center bg-page-orange hover:bg-page-orange-hover rounded-sm">Agregar producto</button>
            </form>
       </Modal>
   </>
  )
}
