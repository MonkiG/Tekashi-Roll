export default function Checkout ({ searchParams }: { searchParams: { cart: string } }): JSX.Element {
  const { cart } = searchParams
  const parseredCart = JSON.parse(cart)
  console.log(parseredCart)
  return (
        <h2>{cart}</h2>
  )
}
