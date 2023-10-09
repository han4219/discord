'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { useParams, useRouter } from 'next/navigation'
import { Channel, ChannelType, MemberRole, Server } from '@prisma/client'
import { Edit, Hash, Lock, Mic, Trash, Video } from 'lucide-react'
import ActionTooltip from '@/components/action-tooltip'
import { ModalType, useModal } from '@/hooks/use-modal-store'

interface Props {
  server: Server
  channel: Channel
  role?: MemberRole
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
}

const ServerChannel = ({ server, channel, role }: Props) => {
  const params = useParams()
  const router = useRouter()
  const { onOpen } = useModal()

  const Icon = iconMap[channel.type]

  return (
    <button
      onClick={() => {}}
      className={cn(
        'group mb-1 flex w-full items-center gap-x-2 rounded-md p-2 text-zinc-500 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50',
        params?.channelId === channel.id && 'bg-zinc-700/20 dark:bg-zinc-700'
      )}
    >
      <Icon className='h-5 w-5 flex-shrink-0 text-zinc-500 dark:text-zinc-400' />
      <p
        className={cn(
          'line-clamp-1 text-left text-sm font-semibold text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300',
          params.channelId === channel.id &&
            'text-primary dark:text-zinc-200 dark:group-hover:text-white'
        )}
      >
        {channel.name}
      </p>
      {channel.name !== 'general' && role !== MemberRole.GUEST && (
        <div className='ml-auto flex items-center gap-x-1'>
          <ActionTooltip
            label='Edit'
            children={
              <Edit
                onClick={() =>
                  onOpen(ModalType.EDIT_CHANNEL, { channel, server })
                }
                className={cn(
                  'hidden h-4 w-4 text-zinc-500 transition hover:text-zinc-600 group-hover:block dark:text-zinc-400 dark:hover:text-zinc-300',
                  params.channelId === channel.id && 'block'
                )}
              />
            }
          />
          <ActionTooltip
            label='Delete'
            children={
              <Trash
                onClick={() =>
                  onOpen(ModalType.DELETE_CHANNEL, { channel, server })
                }
                className={cn(
                  'hidden h-4 w-4 text-zinc-500 transition hover:text-zinc-600 group-hover:block dark:text-zinc-400 dark:hover:text-zinc-300',
                  params.channelId === channel.id && 'block'
                )}
              />
            }
          />
        </div>
      )}
      {channel.name === 'general' && (
        <Lock className='ml-auto h-4 w-4 text-zinc-500 dark:text-zinc-400' />
      )}
    </button>
  )
}

export default ServerChannel
