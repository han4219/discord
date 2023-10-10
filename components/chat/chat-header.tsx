import React from 'react'

import MobileToggle from '@/components/mobile-toggle'
import { Hash } from 'lucide-react'
import UserAvatar from '../user-avatar'

interface Props {
  serverId: string
  name: string
  type: 'channel' | 'conversation'
  imageUrl?: string
}

const ChatHeader = ({ serverId, name, type, imageUrl }: Props) => {
  return (
    <div className='text-md flex h-12 w-full items-center border-b-2 border-neutral-200 px-3 font-semibold dark:border-neutral-800'>
      <MobileToggle serverId={serverId} />
      {type === 'channel' && (
        <Hash className='mr-2 h-5 w-5 text-zinc-500 dark:text-zinc-400' />
      )}
      {type === 'conversation' && !!imageUrl && (
        <UserAvatar src={imageUrl} className='h-8 w-8 md:h-10 md:w-10' />
      )}
      <p className='text-md font-semibold text-black dark:text-white'>{name}</p>
      <div className='ml-auto flex items-center'>
        {type === 'conversation' && 'Chat Video'}
        Socket indocator
      </div>
    </div>
  )
}

export default ChatHeader
