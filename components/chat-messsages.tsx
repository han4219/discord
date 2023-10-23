'use client'

import { Member } from '@prisma/client'
import React from 'react'
import ChatWelcome from './chat/chat-welcome'
import useChatQuery from '@/hooks/use-chat-query'
import { Loader2, ServerCrash } from 'lucide-react'

// Remember: we are have only two type of message, that are channel and 1:1 (conversation)

interface Props {
  name: string // name of chat: maybe channel name, conversation name
  member: Member // member is the current logged in user
  chatId: string // maybe channelId or conversationId(userId)
  apiUrl: string // api url to fetch all message
  socketUrl: string // socket api url to send message
  paramValue: string // value of channelId or conversationId
  socketQuery: Record<string, string> // channelid and serverid used for socket api
  type: 'channel' | 'conversation'
  paramKey: 'channelId' | 'conversationId'
}

const ChatMessages = ({
  type,
  name,
  member,
  chatId,
  apiUrl,
  paramKey,
  socketUrl,
  paramValue,
  socketQuery,
}: Props) => {
  const queryKey = `chat:${chatId}`
  const { status } = useChatQuery({
    apiUrl,
    paramKey,
    paramValue,
    queryKey,
  })

  if (status === 'loading') {
    return (
      <div className='flex flex-1 flex-col items-center justify-center'>
        <Loader2 className='mb-4 h-8 w-8 animate-spin text-zinc-500 dark:text-zinc-400' />
        <p className='text-sm text-zinc-500 dark:text-zinc-400'>
          Loading messages...
        </p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className='flex flex-1 flex-col items-center justify-center'>
        <ServerCrash className='mb-4 h-8 w-8 text-zinc-500 dark:text-zinc-400' />
        <p className='text-sm text-zinc-500 dark:text-zinc-400'>
          Something went wrong!
        </p>
      </div>
    )
  }

  return (
    <div className='flex flex-1 flex-col overflow-y-auto py-4'>
      <div className='flex-1'></div>
      <ChatWelcome type={type} name={name} />
    </div>
  )
}

export default ChatMessages
