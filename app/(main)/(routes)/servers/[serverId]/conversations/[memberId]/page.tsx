import React from 'react'

import { redirect } from 'next/navigation'
import { redirectToSignIn } from '@clerk/nextjs'
import { currentProfile } from '@/lib/currentProfile'
import { getOrCreateConversation } from '@/lib/conversation'

import ChatHeader from '@/components/chat/chat-header'
import { db } from '@/lib/db'

interface Props {
  params: {
    serverId: string
    memberId: string
  }
}

const ConversationMemberIdPage = async ({ params }: Props) => {
  const profile = await currentProfile()

  if (!profile) {
    return redirectToSignIn()
  }

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  })

  if (!currentMember) {
    return redirect('/')
  }

  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  )

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`)
  }

  const { memberOne, memberTwo } = conversation

  const otherMember = profile.id === memberOne.profileId ? memberTwo : memberOne

  return (
    <div>
      <ChatHeader
        name={otherMember.profile.name}
        serverId={params.serverId}
        type='conversation'
        imageUrl={otherMember.profile.imageUrl}
      />
    </div>
  )
}

export default ConversationMemberIdPage
