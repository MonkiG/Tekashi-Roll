'use client'
import Modal from '@/app/components/Modal'
import { getAllCategories } from '@/app/services/categoriesServices'
import { type AddProduct, type Category } from '@/app/types'
import { uploadProductImage } from '@/app/services/imagesServices'
import Image from 'next/image'
import { useEffect, useState, useRef, useContext } from 'react'
import { addProduct } from '@/app/services/productServices.ts/productsServices'
import { FilterContext } from './components/FilterContext'
import editProductById from '@/app/services/productServices.ts/editProductById'

export default function ProductModal ({ handleCloseModal, product }: { handleCloseModal: () => void, product?: AddProduct & { id: `${string}-${string}-${string}-${string}-${string}` } }): JSX.Element {
  const [categories, setCategories] = useState<Category[] | null>()
  const [productData, setProductData] = useState<AddProduct>(product ?? {
    name: '',
    price: '',
    description: '',
    categoryId: '',
    imgUrl: ''
  })
  const { handleAgain } = useContext(FilterContext)
  const imgInputRef = useRef<HTMLInputElement | null>(null)
  const imgInputFileRef = useRef<File | null>(null)

  useEffect(() => {
    getAllCategories().then(data => {
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
    imgInputFileRef.current = file
    setProductData(prev => ({
      ...prev,
      imgUrl: `https://hrfopsbdnnjaxeedlnot.supabase.co/storage/v1/object/public/images/products/${prev.name}`
    }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const data = e.target.value
    setProductData(prevData => {
      return {
        ...prevData,
        categoryId: data
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (Object.values(productData).some(prop => prop === '')) {
      alert('No deje campos vacios')
      return
    }

    if (imgInputFileRef.current) {
      await uploadProductImage(imgInputFileRef.current, productData.name)
    }

    if (product) {
      const { imgUrl, categoryId, ...rest } = productData

      await editProductById(product.id, rest)
    } else {
      await addProduct(productData)
    }
    handleCloseModal()
    handleAgain()
  }

  return (

    <Modal className='overflow-hidden flex flex-col justify-center items-center'>
      <div className='w-3/4 h-5/6 bg-gray-200 border-3 border-page-orange border-solid px-16 pt-12 relative'>
        <hr className='border-page-gray w-full m-auto border-t-2 mb-2'/>
        <button className='absolute right-5 top-3 text-3xl' onClick={handleCloseModal} title='Close modal'>x</button>
        <form onSubmit={handleSubmit} className='flex flex-col h-full w-full'>
          <div className='py-1'>
            <label htmlFor="name" className='font-bold pr-2'>Nombre del producto:</label>
            <input type="text" name='name' required placeholder='Monkey Roll' className='px-1' value={productData.name} onChange={handleInputChange}/>
          </div>
          <div className='py-1'>
            <label htmlFor="price" className='font-bold pr-2'>Precio:</label>
            <input type="number" name='price' required placeholder='$350.00 MX' className='px-1' value={productData.price} onChange={handleInputChange}/>
          </div>
          <div className='py-1 flex flex-col gap-1'>
            <label htmlFor="description" className='font-bold pr-2'>Descripción:</label>
            <textarea className='px-2 resize-none' name="description" required placeholder='Rollo de arroz cubierto con platano dorado relleno de aguacate, pepino, queso crema, camaron y surimi' value={productData.description} onChange={handleInputChange}></textarea>
          </div>
          <div className='py-1'>
            <label htmlFor="category_id" className='font-bold pr-2'>Categoría:</label>
              <select name="category_id" required onChange={handleSelectChange}>
                <option value={''}>Seleccione una categoria</option>
                {categories?.map(categorie => (
                  <option value={categorie.id} key={categorie.id} selected={categorie.id === product?.categoryId}>{categorie.name}</option>
                ))}
              </select>
            </div>
          <div className='flex h-1/2 py-2 justify-center items-center px-2'>

            <div>
              <label htmlFor="image" className=''>Selecciona la imagen del producto</label>
              <input type="file" name="image" accept='image/*' ref={imgInputRef} onChange={handleFileChange} className='text-hidden text-transparent'/>
            </div>

            { /* eslint-disable-next-line */
              (imgInputFileRef.current || (product && product.imgUrl)) && (
                <Image
                  src={imgInputFileRef.current ? URL.createObjectURL(imgInputFileRef.current) : (product ? product.imgUrl : '')}
                  width={316}
                  height={160}
                  alt={`Imagen de producto: ${productData.name}`}
                  className='w-[316px] h-[160px] object-cover'
                />
              )
            }
          </div>
          <button type='submit' className="p-1 text-center bg-page-orange hover:bg-page-orange-hover rounded-sm w-1/5 m-auto">{product ? 'Editar producto' : 'Agregar producto'}</button>
        </form>
      </div>
    </Modal>

  )
}
