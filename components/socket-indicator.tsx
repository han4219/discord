'use client'

import { Badge } from '@/components/ui/badge'
import { useSocket } from '@/components/providers/socket-provider'

export const SocketIndicator = () => {
  const socket = useSocket()

  if (!socket.isConnected) {
    return (
      <Badge className='border-none bg-yellow-500 text-xs font-semibold text-white'>
        Fallback: Polling every minutes
      </Badge>
    )
  }

  return (
    <Badge className='border-none bg-emerald-600 text-xs font-semibold text-white '>
      Live: Realtime updates
    </Badge>
  )
}
