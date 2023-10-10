import React from 'react'
import { db } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { currentProfile } from '@/lib/currentProfile'

import ChatHeader from '@/components/chat/chat-header'
import { redirect } from 'next/navigation'

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

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
    },
  })

  const channel = await db.channel.findFirst({
    where: {
      id: params.channelId,
      serverId: params.serverId,
      profileId: profile.id,
    },
  })

  if (!server || !channel) {
    return redirect('/')
  }

  return (
    <div>
      <ChatHeader
        name={channel?.name}
        serverId={params.serverId}
        type='channel'
      />
    </div>
  )
}

export default ChannelIdPage
  