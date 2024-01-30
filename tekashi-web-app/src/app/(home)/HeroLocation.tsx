'use client'

import LocationIcon from '../components/icons/Location'
import useGetUserLocation from '../hooks/useGetUserLocation'

export default function HeroLocation (): JSX.Element {
  const { parseredPosition } = useGetUserLocation()

  return (
        <span className='inline-flex items-center bg-gray-500 rounded-md p-2 m-5'>
            <LocationIcon width={25} height={25} stroke='#d1d5db'/>
            <div className='flex flex-col ml-2 leading-4'>
                <small className='text-gray-300 py-1'>{parseredPosition.label}</small>
                <strong className='text-gray-200 py-1'>{parseredPosition.position}</strong> {/* Obtener ubicacion mediante el navegador */}
            </div>
        </span>
  )
}
