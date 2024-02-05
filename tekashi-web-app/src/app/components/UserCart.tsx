'use client'

import { useState } from 'react'
import Cart from './icons/Cart'
import MainButton from './MainButton'
import Image from 'next/image'

export default function UserCart ({ userId }: { userId: string }): JSX.Element {
  const [showCart, setShowCart] = useState(false)
  console.log(userId)
  return (
   <>
    <button
      className='hover:bg-page-black-hover p-2'
      onClick={() => { setShowCart(!showCart) }}
    >
      <Cart />
    </button>
    {showCart &&
        <section
          className='absolute bg-white right-[210px] top-12 z-10 min-h-80 min-w-80 max-h-[600px] rounded-sm flex flex-col justify-between'>
            <header className='relative bg-gray-300 font-[Lalezar] p-5'>
              <h3 className='text-center uppercase'>Mi carrito</h3>
              <button
                className='absolute right-4 top-2 font-sans'
                onClick={() => { setShowCart(false) }}
              >X</button>
            </header>
            <ul className='overflow-auto'>
                {Array.from({ length: 10 }, (_, i) => <CartProduct
                                                        handleDeleteProduct={() => { console.log(`producto ${i} eliminado`) }}
                                                        key={i}
                                                        numberOfProduct={i}/>
                )}
            </ul>
            <footer className='text-sm'>
                <hr className='border-page-gray'/>
                <div className='uppercase text-center w-full p-1'>total: </div>
                <div className='flex justify-around items-center p-3'>
                    <span>$10,000 MXN</span> {/** Cambiar divisa dinamicamente */}
                    <MainButton content='Pagar' className='w-20' href='/'/>
                </div>
            </footer>
        </section>
    }
   </>
  )
}

interface CartProductProps {
  productName?: string
  productPrice?: string | number
  productImgUrl?: string
  numberOfProduct?: number
  handleDeleteProduct: () => void
}
const CartProduct = ({
  handleDeleteProduct,
  numberOfProduct = 0,
  productImgUrl = 'https://placehold.co/96x40',
  productName = 'Nombre del Platillo',
  productPrice = '10,000'
}: CartProductProps): JSX.Element => {
  const [productCount, setProductCount] = useState<number>(numberOfProduct)

  const handlePlusCounter = (): void => {
    setProductCount(prevCount => {
      return Number(prevCount) + 1
    })
  }
  const handleSubtractCounter = (): void => {
    setProductCount(prevCount => {
      return Number(prevCount) > 0 ? Number(prevCount) - 1 : 0
    })
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    const number = Number(value)
    setProductCount(number)
  }
  return (
    <>
      <li className='flex my-3 text-sm relative'>
        <button className='absolute right-2 top-[-7px]' onClick={handleDeleteProduct}>x</button>
        <Image src={productImgUrl} alt="product image" width={96} height={40} className='mx-1 w-24 h-10' />
        <div className='text-xs flex flex-col justify-center mx-3'>
            <span className='block'>{productName}</span>
            <span className='block'>Precio: ${productPrice} MXN</span>
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
