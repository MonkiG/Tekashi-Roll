import { getUserBySession } from '@/app/services/authServices'
import { type UUID } from 'crypto'
import { redirect } from 'next/navigation'
import TogoClientPage from './page.client'

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

  return (<TogoClientPage user={user}/>)
}
