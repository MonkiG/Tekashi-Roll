import { useState } from 'react'

export default function useLoader () {
  const [isLoading, setIsLoading] = useState(false)
  const activeLoading = () => setIsLoading(true)
  const deactivateLoading = () => setIsLoading(false)

  return { isLoading, activeLoading, deactivateLoading }
}
