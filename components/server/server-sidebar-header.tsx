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

interface Props {
  server: TServerWithMembersAndProfiles
  role?: MemberRole
}

const dropdownItemClassName =
  'cursor-pointer px-3 py-2 text-sm dark:hover:bg-indigo-500 dark:hover:text-white'

const ServerSidebarHeader = ({ server, role }: Props) => {
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
          {server.name}
          {isOpenDropdown ? (
            <ChevronUp className='ml-auto h-5 w-5' />
          ) : (
            <ChevronDown className='ml-auto h-5 w-5' />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 space-y-[2px] text-xs font-medium text-black dark:text-neutral-400'>
        <DropdownMenuGroup>
          {isModerator && (
            <DropdownMenuItem
              className={`${dropdownItemClassName} text-indigo-600 dark:text-indigo-400`}
            >
              Invite People
              <UserPlus className='ml-auto h-4 w-4' />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem className={dropdownItemClassName}>
              Server Settings
              <Settings className='ml-auto h-4 w-4' />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem className={dropdownItemClassName}>
              Manager Members
              <Users className='ml-auto h-4 w-4' />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuItem className={dropdownItemClassName}>
              Create Channels
              <PlusCircle className='ml-auto h-4 w-4' />
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        {isModerator && <DropdownMenuSeparator />}
        <DropdownMenuGroup>
          {isAdmin && (
            <DropdownMenuItem
              className={`${dropdownItemClassName} text-red-600 dark:text-red-400 dark:hover:bg-red-600`}
            >
              Delete Server
              <Trash2 className='ml-auto h-4 w-4' />
            </DropdownMenuItem>
          )}
          {isModerator && <DropdownMenuSeparator />}
          {isAdmin && (
            <DropdownMenuItem
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

export default ServerSidebarHeader
