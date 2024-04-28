'use client'

import Modal from '@/app/components/Modal'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { type Product } from '@/app/types'
import { makeTogo } from '@/app/services/togoServices'
import { type UUID } from 'crypto'
export default function CheckoutButton ({ cart, userId }: { cart: string, userId: UUID }): JSX.Element {
  const cardParsered = JSON.parse(cart) as Product[]

  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState<string>('')
  const [productsCount] = useState<number>(cardParsered.reduce((prev, curr, i) => prev + curr.amount, 0))
  const [totalAmount] = useState<number>(cardParsered.reduce((prev, curr, i) => prev + (parseFloat(curr.price as string) * curr.amount), 0))
  const router = useRouter()

  const handleClickCash = async (): Promise<void> => {
    if (productsCount >= 10 || totalAmount > 1500) {
      setError('Para pagar en efectivo el total debe ser menor a 1500 y la cantidad de productos debe ser menor de 10.')
    } else {
      // Enviar a la db
      await makeTogo(cardParsered, userId)
      router.push(`/user/${userId}/togo`)
    }
  }

  const handleClickCard = (): void => {
    if (productsCount >= 15 || totalAmount > 2500) {
      setError(' Para pagar con tarjeta  el total debe ser menor a $2500 MXN y la cantidad de productos debe ser menor de 15.')
    } else {
      router.push(`/checkout/payment?products=${encodeURIComponent(cart)}`)
    }
  }

  return (
        <>
            <button onClick={() => { setShowModal(!showModal) }}>Pagar</button>
            {showModal && <Modal className='flex justify-evenly items-center'>
                {
                  !error
                    ? (<>
                      <button
                        onClick={handleClickCard}
                        className='text-2xl p-1 w-1/5 h-1/5 flex items-center justify-center text-page-orange bg-page-red hover:bg-page-red-hover rounded-sm'>
                        Tarjeta
                      </button>
                      <button
                      onClick={handleClickCash}
                      className='text-2xl p-1 w-1/5 h-1/5 flex items-center justify-center text-page-orange bg-page-red hover:bg-page-red-hover rounded-sm' >
                        Efectivo
                      </button>
                  </>)
                    : <div className='text-page-orange bg-page-red w-1/2 h-1/2 flex flex-col relative'>
                        <button
                        className='absolute right-5 top-1'
                        onClick={() => {
                          setError('')
                          setShowModal(false)
                        }}>X</button>
                        <div className='h-full flex flex-col items-center'>
                          <h2 className='text-3xl uppercase my-5'>Error!</h2>
                          <div className='px-12'>
                           {error} <br />
                          </div>
                          <div>
                            total de productos: {productsCount} <br />
                            total a pagar: ${totalAmount} MXN
                          </div>
                        </div>
                      </div>
                }
            </Modal>}
        </>
  )
}
