import React from 'react'
import { db } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { currentProfile } from '@/lib/currentProfile'

import ChatHeader from '@/components/chat/chat-header'
import { redirect } from 'next/navigation'
import ChatInput from '@/components/chat/chat-input'
import ChatMessages from '@/components/chat-messsages'

interface Props {
  params: {
    serverId: string
    channelId: string
  }
}

const ChannelIdPage = async ({ params }: Props) => {
  const profile = await currentProfile()

  if (!profile) {
    return redirectToSignIn()
  }

  const member = await db.member.findFirst({
    where: {
      profileId: profile.id,
      serverId: params.serverId,
    },
  })

  const channel = await db.channel.findFirst({
    where: {
      id: params.channelId,
      serverId: params.serverId,
      profileId: profile.id,
    },
  })

  if (!member || !channel) {
    return redirect('/')
  }

  return (
    <div className='flex h-full flex-col bg-white dark:bg-[#313338]'>
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type='channel'
      />
      <ChatMessages
        name={channel.name}
        member={member}
        apiUrl='/api/messages'
        chatId={channel.id}
        paramKey='channelId'
        paramValue={channel.id}
        type='channel'
        socketUrl='/api/socket/message'
        socketQuery={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
      />
      <ChatInput
        apiUrl='/api/socket/message'
        name={channel.name}
        type='channel'
        query={{
          serverId: channel.serverId,
          channelId: channel.id,
        }}
      />
    </div>
  )
}

export default ChannelIdPage
  