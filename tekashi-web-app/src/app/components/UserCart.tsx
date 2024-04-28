'use client'

import { useCallback, useContext, useEffect, useState } from 'react'
import Cart from './icons/Cart'
import MainButton from './MainButton'
import Image from 'next/image'
import { CartContext } from '../(client-view)/CartContext'
import { type CartProduct } from '../hooks/useUserTogo'
import { type User } from '../types'

export default function UserCart ({ user }: { user: User }): JSX.Element {
  const [showCart, setShowCart] = useState(false)
  const { handleDeleteTogoProduct, handleSetTogoProductAmount, products } = useContext(CartContext)

  const reducePrice = useCallback((): number => products.reduce((prev, curr, i, arr) => {
    return prev + (curr.price * curr.amount)
  }, 0), [products])

  const [total, setTotal] = useState<number>(reducePrice())

  useEffect(() => {
    setTotal(reducePrice())
  }, [products])
  return (
   <>
    <button
      className='hover:bg-page-black-hover p-2 relative'
      onClick={() => { setShowCart(!showCart) }}
    >
      <Cart />
      {products.length > 0 && <span className='bg-green-600 w-3 h-3 rounded-full absolute bottom-[10px] left-[5px] animate-pulse'></span>}
    </button>
    {showCart &&
        <section
          className='absolute bg-white right-[200px] top-12 z-10 min-h-80 min-w-80 max-h-[600px] rounded-sm flex flex-col justify-between'>
            <header className='relative bg-gray-300 font-[Lalezar] p-5'>
              <h3 className='text-center uppercase'>Mi carrito</h3>
              <button
                className='absolute right-4 top-2 font-sans'
                onClick={() => { setShowCart(false) }}
              >X</button>
            </header>
            <ul className='overflow-auto'>
                {products
                  ? products.map(product => <ECartProduct
                                                        handleDeleteProduct={() => { handleDeleteTogoProduct({ productId: product.id }) }}
                                                        handleSetTogoProductAmount={handleSetTogoProductAmount}
                                                        key={product.id}
                                                        product={product}
                                                      />)
                  : null
                }
            </ul>
            <footer className='text-sm'>
                <hr className='border-page-gray'/>
                <div className='uppercase text-center w-full p-1'>total: </div>
                <div className='flex justify-around items-center p-3'>
                    <span>${total && total} MXN</span> {/** Cambiar divisa dinamicamente */}
                    <MainButton content='Pagar' className='w-20' href={`/checkout?cart=${encodeURIComponent(JSON.stringify(products))}`}/>
                </div>
            </footer>
        </section>
    }
   </>
  )
}

/** TODO
 * Refactorizate this code
 */
interface CartProductProps {
  product: CartProduct
  handleDeleteProduct: () => void
  handleSetTogoProductAmount: ({ productId, amount }: { productId: string, amount: number | string }) => void
}
const ECartProduct = ({
  handleDeleteProduct,
  product,
  handleSetTogoProductAmount
}: CartProductProps): JSX.Element => {
  const [productCount, setProductCount] = useState<number | string>(product.amount ?? 1)

  const handlePlusCounter = useCallback((): void => {
    handleSetTogoProductAmount({ productId: product.id, amount: Number(productCount) + 1 })
    setProductCount(Number(productCount) + 1)
  }, [productCount, handleSetTogoProductAmount])
  const handleSubtractCounter = useCallback((): void => {
    handleSetTogoProductAmount({ productId: product.id, amount: Number(productCount) > 0 ? Number(productCount) - 1 : 0 })
    setProductCount(Number(productCount) > 0 ? Number(productCount) - 1 : 0)
  }, [productCount, handleSetTogoProductAmount])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    const number = Number(value)

    handleSetTogoProductAmount({ productId: product.id, amount: number })
    setProductCount(number)
  }, [productCount, handleSetTogoProductAmount])

  return (
    <>
      <li className='flex my-3 text-sm relative'>
        <button className='absolute right-2 top-[-7px]' onClick={handleDeleteProduct}>x</button>
        <Image src={product.imgUrl} alt="product image" width={96} height={40} className='mx-1 w-24 h-10' />
        <div className='text-xs flex flex-col justify-center mx-3'>
            <span className='block'>{product.name}</span>
            <span className='block'>Precio: ${parseFloat(product.price as string) * parseInt(product.amount as string)} MXN</span>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <input type='number' value={productCount.toLocaleString()} className='w-6 text-center' onChange={handleChange} />
          <div className='flex justify-between w-full'>
            <button onClick={handleSubtractCounter} className='text-center text-page-orange bg-page-red hover:bg-page-red-hover rounded-sm px-[2px] mx-1'>-</button>
            <button onClick={handlePlusCounter} className='text-center text-page-orange bg-page-red hover:bg-page-red-hover rounded-sm px-[2px] mx-1'>+</button>
          </div>
        </div>
      </li>
      <hr className='border-page-gray w-3/4 m-auto last:hidden'/>
    </>
  )
}
