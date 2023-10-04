import { useEffect, useState } from 'react'

const useOriginLink = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return ''

  const originLInk =
    typeof window !== undefined && window.location.origin
      ? window.location.origin
      : ''

  return originLInk
}

export default useOriginLink
