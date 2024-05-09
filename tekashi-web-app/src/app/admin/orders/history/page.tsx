import Missing from '@/app/components/Missing'
import { getServerComponentClient } from '@/app/helpers/supabaseHelpers'
import moment from 'moment-timezone'

export default async function OrdersHistory (): Promise<JSX.Element> {
  const statusDictionary: Record<string, string> = {
    preparing: 'En preparación',
    delivering: 'En reparto',
    delivered: 'Entregado'
  }
  const supabase = getServerComponentClient()
  const { data: togos } = await supabase.from('togo').select('*, user:users(*)')
  return (
    <div className='h-full flex flex-col grow relative '>
      <h2 className='text-center text-2xl py-5'>Historial de pedidos</h2>
      <div className='flex flex-col mx-5 overflow-y-auto'>
        {
          togos && togos.length > 0 &&
            togos.map(togo => (
              <div className='flex justify-between px-5 py-1 pb-2 border-b-2 border-black border-solid' key={togo.id}>
                <div>
                <div>
                    Total: <span>$ {togo.total} MXN</span>
                </div>
                <div>
                  Pedido Id: <span>{togo.id.slice(-4)}</span>
                </div>
                </div>
                <div>
                    status: <span
                        className={
                            `${togo.status === 'preparing' && 'bg-page-red'} 
                            ${togo.status === 'delivering' && 'bg-page-orange'}
                            ${togo.status === 'delivered' && 'bg-green-700'}
                            rounded-full py-1 px-2 text-white`
                        }>{statusDictionary[togo.status]}</span>
                </div>
                <div>
                  Fecha: <span>{moment(togo.datetime as string).tz('America/Mexico_City').format('DD-MM-YYYY HH:mm')}</span>
                </div>
                {/* <button onClick={handleShowProducts(true)} className='underline'>
                    productos: <span>{data.products.reduce((prev, curr) => prev + curr.amount, 0) || data.products.length}</span>
                </button> */}
              </div>
            ))
        }
        {
          togos && togos.length <= 0 && <Missing className='h-full flex flex-col items-center justify-center grow' text='No cuentas con pedidos'/>
        }
      </div>
    </div>
  )
}
