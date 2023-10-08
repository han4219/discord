import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { ChannelType, MemberRole } from '@prisma/client'
import { currentProfile } from '@/lib/currentProfile'
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from 'lucide-react'

import { ScrollArea } from '@/components/ui/scroll-area'
import ServerHeader from '@/components/sidebar/server/server-header'
import ServerSearch from '@/components/sidebar/server/server-search'

const iconChannelMap = {
  [ChannelType.TEXT]: <Hash className='mr-2 h-4 w-4' />,
  [ChannelType.AUDIO]: <Mic className='mr-2 h-4 w-4' />,
  [ChannelType.VIDEO]: <Video className='mr-2 h-4 w-4' />,
}

const iconMemberMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className='mr-2 h-4 w-4 text-indigo-500' />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className='mr-2 h-4 w-4 text-rose-500' />,
}

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
      <ServerHeader server={server} role={role} />
      <ScrollArea className='flex-1 px-3'>
        <div className='mt-2'>
          <ServerSearch
            data={[
              {
                label: 'Text channels',
                type: 'channel',
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconChannelMap[channel.type],
                })),
              },
              {
                label: 'Audio channels',
                type: 'channel',
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconChannelMap[channel.type],
                })),
              },
              {
                label: 'Video channels',
                type: 'channel',
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconChannelMap[channel.type],
                })),
              },
              {
                label: 'Members',
                type: 'member',
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: iconMemberMap[member.role],
                })),
              },
            ]}
          />
        </div>
      </ScrollArea>
    </div>
  )
}

export default ServerSidebar
