'use client'
import { useContext } from 'react'
import { FilterContext } from './FilterContext'
import Missing from '@/app/components/Missing'
import ProductCard from '@/app/(client-view)/menu/ProductCard'
import { CartContext } from '../CartContext'
import { type CartProduct } from '@/app/hooks/useUserTogo'
export default function ProductSection (): JSX.Element {
  const { products, filters, categories } = useContext(FilterContext)
  const { handleSetTogoProducts } = useContext(CartContext)

  return (<>

        <header className='grid grid-cols-5 items-center'>
          <h2 className="m-5 col-start-3 text-center font-bold text-xl">{filters.category === 'any' ? 'All products' : categories?.find(category => filters.category === category.id)?.name}</h2>
        </header>
        {
          products &&
          <section className={`mx-16 my-3 grid ${products.length > 0 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1 items-center'} row-auto gap-x-20 gap-y-10 h-[700px] overflow-auto`}>
          {products.length > 0
            ? products.map((product, i) => <ProductCard key={product.id} data={product} addToCart={() => { handleSetTogoProducts({ product: product as CartProduct }) }}/>)
            : <Missing text='No se encontraron productos' className='place-self-center'/>
          }
        </section>
        }

    </>)
}
