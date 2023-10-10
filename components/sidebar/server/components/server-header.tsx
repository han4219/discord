'use client'

import { MemberRole } from '@prisma/client'
import { TServerWithMembersAndProfiles } from '@/types'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ChevronDown,
  ChevronUp,
  LogOut,
  PlusCircle,
  Settings,
  Trash2,
  UserPlus,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import { ModalType, useModal } from '@/hooks/use-modal-store'

interface Props {
  server: TServerWithMembersAndProfiles
  role?: MemberRole
}

const dropdownItemClassName =
  'cursor-pointer px-3 py-2 text-sm dark:hover:bg-indigo-500 dark:hover:text-white'

const ServerHeader = ({ server, role }: Props) => {
  const { onOpen } = useModal()
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const isAdmin = role === MemberRole.ADMIN
  const isModerator = isAdmin || role === MemberRole.MODERATOR

  return (
    <DropdownMenu
      open={isOpenDropdown}
      onOpenChange={() => setIsOpenDropdown(!isOpenDropdown)}
    >
      <DropdownMenuTrigger className='focus:outline-none' asChild>
        <button className='text-md flex h-12 w-full items-center border-b-2 border-neutral-200 px-3 font-semibold transition hover:bg-zinc-700/10 dark:border-neutral-800 dark:hover:bg-zinc-700/50 '>
          <div className='mr-2 md:hidden'>
            {isOpenDropdown ? (
              <ChevronUp className='h-5 w-5' />
            ) : (
              <ChevronDown className='h-5 w-5' />
            )}
          </div>
          <p className='line-clamp-1 max-w-[90%] text-left'>{server.name}</p>
          <div className='hidden md:ml-auto md:block'>
            {isOpenDropdown ? (
              <ChevronUp className='ml-auto h-5 w-5' />
            ) : (
              <ChevronDown className='ml-auto h-5 w-5' />
            )}
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 space-y-[2px] text-xs font-medium text-black dark:text-neutral-400'>
        <DropdownMenuGroup>
          {isModerator && (
            <DropdownMenuItem
              onClick={() => onOpen(ModalType.INVITE_MEMBER, { server })}
              className={`${dropdownItemClassName} text-indigo-600 dark:text-indigo-400`}
            >
              Invite People
              <UserPlus className='ml-auto h-4 w-4' />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem
              onClick={() => onOpen(ModalType.EDIT_SERVER, { server })}
              className={dropdownItemClassName}
            >
              Server Settings
              <Settings className='ml-auto h-4 w-4' />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem
              onClick={() => onOpen(ModalType.MANAGE_MEMBERS, { server })}
              className={dropdownItemClassName}
            >
              Manager Members
              <Users className='ml-auto h-4 w-4' />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuItem
              onClick={() => onOpen(ModalType.CREATE_CHANNEL, { server })}
              className={dropdownItemClassName}
            >
              Create Channels
              <PlusCircle className='ml-auto h-4 w-4' />
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        {isModerator && <DropdownMenuSeparator />}
        <DropdownMenuGroup>
          {isAdmin && (
            <DropdownMenuItem
              onClick={() => onOpen(ModalType.DELETE_SERVER, { server })}
              className={`${dropdownItemClassName} text-red-600 dark:text-red-400 dark:hover:bg-red-600`}
            >
              Delete Server
              <Trash2 className='ml-auto h-4 w-4' />
            </DropdownMenuItem>
          )}
          {!isAdmin && (
            <DropdownMenuItem
              onClick={() => onOpen(ModalType.LEAVE_SERVER, { server })}
              className={`${dropdownItemClassName} text-red-600 dark:text-red-400 dark:hover:bg-red-600`}
            >
              Leave Server
              <LogOut className='ml-auto h-4 w-4' />
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ServerHeader
