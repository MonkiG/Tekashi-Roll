import { NextResponse, type NextRequest } from 'next/server'

// eslint-disable-next-line
const stripe = require('stripe')(process.env.NEXT_PRIVATE_STRIPE_SECRET_KEY)

export async function POST (req: NextRequest): Promise<NextResponse> {
  if (req.body === null) return NextResponse.json({ message: 'error' })

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 200 * 100, // Sacar el total a pagar de los items
    currency: 'mxn'
  })

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret
  }, {
    status: 200
  })
}

export async function GET (): Promise<NextResponse> {
  return NextResponse.json({
    message: 'Si funciona xd'
  })
}
