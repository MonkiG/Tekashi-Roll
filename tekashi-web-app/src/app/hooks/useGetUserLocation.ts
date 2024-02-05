import { useEffect, useRef, useState } from 'react'
import { getLocationByCoords } from '@/helpers/getLocationByCoords'

interface UserAddress {
  country: string
  country_code: string
  county: string
  postcode: string
  road: string
  state: string
  town: string
}

interface HeroPosition {
  label: string
  position: string
}

export default function useGetUserLocation (): { parseredPosition: HeroPosition, fullUserAddress: UserAddress | undefined } {
  const [parseredPosition, setParseredPosition] = useState<HeroPosition>({
    label: 'Nuestra ubicación',
    position: 'Altavela, Nay.'
  })
  const fullUserAddressRef = useRef<UserAddress>()

  useEffect(() => {
    const localStorageUserAddress = window.localStorage.getItem('address')

    if (localStorageUserAddress === null || localStorageUserAddress === undefined) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords
        fullUserAddressRef.current = await getLocationByCoords(latitude, longitude)
        window.localStorage.setItem('address', JSON.stringify(fullUserAddressRef.current))
      }, (err) => {
        console.log(err)
      }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      })
    } else {
      fullUserAddressRef.current = JSON.parse(localStorageUserAddress)
    }

    setParseredPosition({
      label: 'Tú ubicación',
      position: `${fullUserAddressRef.current?.town}, ${fullUserAddressRef.current?.state.slice(0, 3)}.`
    })
  }, [])

  return { parseredPosition, fullUserAddress: fullUserAddressRef.current }
}
