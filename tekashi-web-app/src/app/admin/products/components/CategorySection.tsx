'use client'

import AdminProductCard from './AdminProductCard'
import ProductModal from '../ProductModal'
import { useState } from 'react'

export default function CategorySection ({ category, products }: { category?: string, products?: any[] }): JSX.Element {
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = (): void => { setShowModal(true) }
  const handleCloseModal = (): void => { setShowModal(false) }
  return (
      <>
        <div className='grid grid-cols-5 items-center mx-10'>
          <h2 className="m-5 col-start-3 text-center font-bold text-xl">Titulo categoria</h2>
          <button className='col-start-5' onClick={handleShowModal}>Añadir producto</button>
        </div>
        <section className='m-10'>
          <div className='grid grid-cols-3 row-auto gap-x-20 gap-y-10'>
            {products?.map((_, i) => <AdminProductCard key={`product ${i}`}/>)}
          </div>
        </section>
        {showModal && <ProductModal handleCloseModal={handleCloseModal}/>}
      </>
  )
}
