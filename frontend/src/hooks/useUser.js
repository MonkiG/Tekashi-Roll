import { useState } from 'react'

export default function useUser () {
  const [userToken] = useState(window.localStorage.getItem('token'))
  const [userData, setUserData] = useState({ rol: '', name: '' })

  const handleUserData = (data) => {
    setUserData(prevData => (data))
  }
  return { userToken, handleUserData, userData }
}
