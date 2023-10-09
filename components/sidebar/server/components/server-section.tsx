'use client'

import ActionTooltip from '@/components/action-tooltip'
import { ModalType, useModal } from '@/hooks/use-modal-store'
import { TServerWithMembersAndProfiles } from '@/types'
import { ChannelType, MemberRole } from '@prisma/client'
import { Plus, Settings } from 'lucide-react'
import React from 'react'

interface Props {
  label: string
  sectionType: 'channels' | 'members'
  role?: MemberRole
  server?: TServerWithMembersAndProfiles
  channelType?: ChannelType
}

const ServerSection = ({
  role,
  label,
  server,
  channelType,
  sectionType,
}: Props) => {
  const { onOpen } = useModal()

  return (
    <div className='group flex w-full cursor-pointer items-center justify-between py-2'>
      <span className='flex items-center text-xs font-semibold uppercase text-zinc-500 transition dark:text-zinc-400 dark:group-hover:text-zinc-300'>
        {label}
      </span>
      {role !== MemberRole.GUEST && sectionType === 'channels' && (
        <ActionTooltip
          label='create channel'
          align='center'
          side='top'
          children={
            <button
              onClick={() => onOpen(ModalType.CREATE_CHANNEL, { channelType })}
              className='text-zinc-500 transition dark:text-zinc-400 dark:group-hover:text-zinc-300'
            >
              <Plus className='h-4 w-4' />
            </button>
          }
        />
      )}
      {role === MemberRole.ADMIN && sectionType === 'members' && (
        <ActionTooltip
          label='manage members'
          align='center'
          side='top'
          children={
            <button
              onClick={() => onOpen(ModalType.MANAGE_MEMBERS, { server })}
              className='text-zinc-500 transition dark:text-zinc-400 dark:group-hover:text-zinc-300'
            >
              <Settings className='h-4 w-4' />
            </button>
          }
        />
      )}
    </div>
  )
}

export default ServerSection
