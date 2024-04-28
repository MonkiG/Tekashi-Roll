import { getServerComponentClient } from '@/app/helpers/supabaseHelpers'
import { getUserBySession } from '@/app/services/authServices'
import { redirect } from 'next/navigation'

export default async function TogoHistoryPage (): Promise<JSX.Element> {
  const supabase = getServerComponentClient()
  const user = await getUserBySession()
  if (!user) redirect('/')

  const { data: togos } = await supabase.from('togo').select('*').eq('user_id', user.id)

  return (
    <>
        <h2>Historial de prodyctos</h2>
{
    togos
      ? togos.map(togo => (
        <article key={togo.id}>
            {JSON.stringify(togo)}
        </article>
      ))
      : null
}
    </>
  )
}
