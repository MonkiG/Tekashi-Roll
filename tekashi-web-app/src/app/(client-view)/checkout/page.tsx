import { getUserBySession } from '@/app/services/authServices'
import CheckoutButton from './CheckoutButton'
import { type UUID } from 'crypto'

export default async function Checkout ({ searchParams }: { searchParams: { cart: string } }): Promise<JSX.Element> {
  const { cart } = searchParams
  const parseredCart = JSON.parse(cart)
  const totalToPay = parseredCart.reduce((prev: any, curr: any) => prev + curr.price, 0)
  const totalItems = parseredCart.reduce((prev: any, curr: any) => prev + curr.amount, 0)
  const user = await getUserBySession()
  return (
    <section className=" flex flex-col items-center">
      <h2 className="mt-2 ">Check out</h2>
      <div className="my-4 h-[270px] w-3/4 border-2 border-solid border-gray-300 overflow-y-scroll">
        {parseredCart.map((product: any) =>
        <div key={product.id} className="flex justify-around border-b-2 border-solid border-gray-300 px-5">
          <div className='w-3/4'>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>
          <div className="flex flex-col justify-center w-1/4 text-end px-5">
            <span>Cantidad: {product.amount}</span>
            <span>Precio: ${product.price * product.amount} MXN</span>
          </div>
        </div>)}

      </div>
      <div className="w-full flex justify-around">
        <div>
          <span>Total de productos: {totalItems} </span>
          <span>Total a pagar: ${totalToPay} MXN</span>
        </div>
        <CheckoutButton cart={cart} userId={user?.id as UUID}/>
      </div>
    </section>
  )
}
