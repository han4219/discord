import { Hash } from 'lucide-react'
import React from 'react'

interface Props {
  type: 'channel' | 'conversation'
  name: string
}

const ChatWelcome = ({ type, name }: Props) => {
  return (
    <div className='mb-4 space-y-2 px-4'>
      {type === 'channel' && (
        <div className='flex h-20 w-20 items-center justify-center rounded-full bg-zinc-500 dark:bg-zinc-700'>
          <Hash className='h-12 w-12 text-white' />
        </div>
      )}
      <p className='text-2xl font-bold md:text-3xl'>
        {type === 'channel' ? 'Welcome to #' : ''}
        {name}
      </p>
      <p className='text-sm text-zinc-600 dark:text-zinc-400'>
        {type === 'channel'
          ? `This is start of the #${name} channel.`
          : `This is start of your conversatio with ${name}`}
      </p>
    </div>
  )
}

export default ChatWelcome
