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
import { deleteProductImage } from '@/app/services/imagesServices'

export default function ProductsSection (): JSX.Element {
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [showEditProductModal, setShowEditProductModal] = useState(false)
  const { products, filters, categories, handleAgain } = useContext(FilterContext)
  const router = useRouter()
  const handleShowAddProductModal = (): void => { setShowAddProductModal(true) }

  const handleDeleteProduct = async (id: string, productName: string): Promise<void> => {
    await deleteProductById(id)
    await deleteProductImage(productName)
    handleAgain()
  }

  const handleStatus = async (status: boolean, id: UUID): Promise<void> => {
    await toggleProductStatus(!status, id)
    handleAgain()
  }

  const handleEditProduct = async (): Promise<void> => {

  }
  return (
    <>

      <header className='grid grid-cols-5 items-center'>
        <h2 className="m-5 col-start-3 text-center font-bold text-xl">{filters.category === 'any' ? 'All products' : categories?.find(category => filters.category === category.id)?.name}</h2>
        <button className='col-start-5 text-sm md:text-base flex justify-center justify-self-end text-page-orange p-1 w-1/2 bg-page-red hover:bg-page-red-hover rounded-sm'
          onClick={handleShowAddProductModal}
        >Añadir producto</button>

      </header>
      {
        products &&
        <section className={`mx-16 my-3 grid ${products.length > 0 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1 items-center'} row-auto gap-x-20 gap-y-10 h-[500px] overflow-auto`}>
        {products.length > 0
          ? products.map((product) => <AdminProductCard
            openEditModal={() => { setShowEditProductModal(true) }}
            handleEditProduct={handleEditProduct}
            handleStatus={async () => { await handleStatus(product.enabled, product.id) }}
            handleDeleteProduct={async () => { await handleDeleteProduct(product.id, product.name) }}
            key={product.id} data={product}
          />)
          : <Missing text='No se encontraron productos' className='place-self-center'/>
        }
      </section>
      }

      {products
        ? products.map(product => (showEditProductModal && <ProductModal key={product.id} product={product} handleCloseModal={() => { setShowEditProductModal(false); router.push('/admin/products') }}/>))
        : null}
      {showAddProductModal && <ProductModal handleCloseModal={() => { setShowAddProductModal(false); router.push('/admin/products') }}/>}
      {/* {showEditProductModal && <EditProductModal handleCloseModal={() => { setShowEditProductModal(false); router.push('/admin/products') }} />} */}
    </>
  )
}
