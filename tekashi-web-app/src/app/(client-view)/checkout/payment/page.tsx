'use client'
import { type StripeElementsOptions, loadStripe, type Appearance } from '@stripe/stripe-js'
import CheckoutForm from './CheckoutForm'
import { Elements } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '')

export default function Payment ({ searchParams }: { searchParams: { products: string } }): JSX.Element {
  const { products } = searchParams
  // console.log(JSON.parse(products))
  const [clientSecret, setClientSecret] = useState<any>('')

  useEffect(() => {
    fetch('http://localhost:3000/checkout/payment/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: JSON.parse(products) }) // Lista de productos
    }) // eslint-disable-next-line
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret)
      })
      .catch((e) => { console.error(e) })
  }, [])

  const appearance: Appearance = {
    theme: 'stripe'
  }
  const options: StripeElementsOptions = {
    clientSecret,
    appearance
  }

  return (
   <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}
