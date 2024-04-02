'use client'
import ProductModal from '../ProductModal'
import { useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import AdminProductCard from './AdminProductCard'
import { FilterContext } from './FilterContext'
import Missing from '@/app/components/Missing'
import { deleteProductById } from '@/app/services/productServices.ts/productsServices'
import toggleProductStatus from '@/app/services/productServices.ts/toggleProductStatus'
import { type UUID } from 'crypto'

export default function ProductsSection (): JSX.Element {
  const [showModal, setShowModal] = useState(false)
  const { products, filters, categories, handleAgain } = useContext(FilterContext)
  const router = useRouter()
  const handleShowModal = (): void => { setShowModal(true) }
  const handleCloseModal = (): void => { setShowModal(false); router.push('/admin/products') }

  const handleDeleteProduct = async (id: string): Promise<void> => {
    await deleteProductById(id)
    handleAgain()
  }

  const handleStatus = async (status: boolean, id: UUID): Promise<void> => {
    await toggleProductStatus(!status, id)
    handleAgain()
  }

  return (
    <>

      <header className='grid grid-cols-5 items-center'>
        <h2 className="m-5 col-start-3 text-center font-bold text-xl">{filters.category === 'any' ? 'All products' : categories?.find(category => filters.category === category.id)?.name}</h2>
        <button className='col-start-5 flex justify-center justify-self-end text-page-orange p-1 w-1/2 bg-page-red hover:bg-page-red-hover rounded-sm' onClick={handleShowModal}>Añadir producto</button>
      </header>
      {
        products &&
        <section className={`mx-16 my-3 grid ${products.length > 0 ? 'grid-cols-3' : 'grid-cols-1 items-center'} row-auto gap-x-20 gap-y-10 h-[500px] overflow-auto`}>
        {products.length > 0
          ? products.map((product) => <AdminProductCard handleStatus={async () => { await handleStatus(product.enabled, product.id) }} handleDeleteProduct={async () => { await handleDeleteProduct(product.id) }} key={product.id} data={product}/>)
          : <Missing text='No se encontraron productos' className='place-self-center'/>
        }
      </section>
      }
      {showModal && <ProductModal handleCloseModal={handleCloseModal}/>}
    </>
  )
}
