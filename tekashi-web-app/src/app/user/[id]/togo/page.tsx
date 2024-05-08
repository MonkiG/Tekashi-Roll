import { getUserBySession } from '@/app/services/authServices'
import { getUserTogos } from '@/app/services/togoServices/getUserTogos.server'
import { type UUID } from 'crypto'
import TogoComponent from './Togo'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface Product {
  id: string
  name: string
  price: number
  enabled: boolean
  img_url: string
  categories: {
    name: string
  }
  category_id: string
  description: string
  amount: number
}

export interface GroupedData {
  id: UUID
  total: number
  status: string
  products: Product[]
}

export default async function TogoPage (): Promise<JSX.Element> {
  const user = await getUserBySession()

  if (!user) redirect('/')

  let parseredTogos: GroupedData[] | undefined

  const togos = await getUserTogos(user!.id as UUID) as any[]

  if (togos) {
    parseredTogos = togos.reduce((prev, curr) => {
      const { togo, products } = curr

      if (togo) {
        const existingTogo = prev.find((item: any) => item.id === togo.id)
        if (!existingTogo) {
          prev.push({
            status: togo.status,
            id: togo.id as UUID,
            total: togo.total,
            products: [products]
          })
        } else {
          existingTogo.products.push(products)
        }
      }

      return prev
    }, [])
  }

  return (<section className="w-full h-full border-solid border-2 border-black grow relative">
    <h2 className="text-center text-2xl">Pedidos</h2>
    <Link href={`/user/${user.id}/togo/history`} className='absolute top-0 right-5 underline'>Ver historial de productos</Link>
    {parseredTogos !== undefined && parseredTogos !== null
      ? parseredTogos.map((togo) => {
        return <TogoComponent key={togo.id} data={togo}/>
      })
      : null}
  </section>)
}
