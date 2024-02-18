import { useState, type MutableRefObject } from 'react'
import { addProduct } from '@/app/services/productServices.ts/productsServices'
import { uploadProductImage } from '@/app/services/imagesServices'
import { type AddProduct } from '../types'

export default function useHandleProduct (
  data: AddProduct,
  {
    imgInputRef,
    imgInputFileRef
  }: {
    imgInputRef: MutableRefObject<HTMLInputElement | null>
    imgInputFileRef: MutableRefObject<File | null>
  },
  handleCloseModal: () => void
): {
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    handleSubmit: (e: React.FormEvent) => Promise<void>
  } {
  const [productData, setProductData] = useState<AddProduct>(data)

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

    if (!imgInputFileRef.current) {
      alert('Seleccione una imagen')
      return
    }

    await uploadProductImage(imgInputFileRef.current, productData.name)
    await addProduct(productData)
    alert('Producto agregado correctamente')
    handleCloseModal()
  }

  return {
    handleFileChange,
    handleInputChange,
    handleSelectChange,
    handleSubmit
  }
}
