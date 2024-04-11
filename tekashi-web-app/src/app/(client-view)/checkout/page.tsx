import Link from 'next/link'

export default function Checkout ({ searchParams }: { searchParams: { cart: string } }): JSX.Element {
  const { cart } = searchParams
  const parseredCart = JSON.parse(cart)
  // const test = Array.from({ length: 1 }).map(_ => ({ ...parseredCart }))
  const totalToPay = parseredCart.reduce((prev: any, curr: any) => prev + curr.price, 0)
  const totalItems = parseredCart.reduce((prev: any, curr: any) => prev + curr.amount, 0)
  return (
    <section className=" flex flex-col items-center">
      <h2 className="mt-2 ">Check out</h2>
      <div className="my-4 h-[270px] w-3/4 border-2 border-solid border-gray-300 overflow-y-scroll">
        {parseredCart.map((product: any) =>
        <div key={product.id} className="flex justify-around border-b-2 border-solid border-gray-300">
          <div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>
          <div className="flex flex-col justify-center ">
            <span>Cantidad: {product.amount}</span>
            <span>Precio: {product.price * product.amount}</span>
          </div>
        </div>)}

      </div>
      <div className="w-full flex justify-around">
        <div>
          <span>Total de productos: {totalItems} </span>
          <span>Total a pagar: ${totalToPay}</span>
        </div>
        <Link href="/checkout/payment" className="">Pagar</Link>
      </div>
    </section>
  )
}
