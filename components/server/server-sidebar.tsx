import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { ChannelType } from '@prisma/client'
import { currentProfile } from '@/lib/currentProfile'

import ServerSidebarHeader from '@/components/server/server-sidebar-header'

interface Props {
  serverId: string
}

const ServerSidebar = async ({ serverId }: Props) => {
  const profile = await currentProfile()

  if (!profile) {
    return redirect('/')
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  })

  if (!server) {
    return redirect('/')
  }

  const textChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  )
  const audioChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  )
  const videoChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  )
  const members = server.members.filter(
    (member) => member.profileId !== profile.id
  )
  const role = server.members.find((member) => member.profileId === profile.id)
    ?.role

  return (
    <div className='flex h-full w-full flex-col bg-[#F2F3F5] text-primary dark:bg-[#2B2D31]'>
      <ServerSidebarHeader server={server} role={role} />
      Server Sidebar Content
    </div>
  )
}

export default ServerSidebar
