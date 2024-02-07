import { getServerComponentClient } from '../helpers/supabaseHelpers'

export default async function MainAdmin (): Promise<JSX.Element> {
  const supabase = getServerComponentClient()

  const {
    data,
    error
  } = await supabase.from('products').select('*')

  return (
    <main className="h-full bg-red-600 my-10 mx-14">
      <section>
        <h2 className="m-5 text-center font-bold text-xl">Titulo categoria</h2>
        <div>
          Componente de productos
        </div>
      </section>
    </main>
  )
}
