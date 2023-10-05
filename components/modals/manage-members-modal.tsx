'use client'

import axios from 'axios'
import qs from 'query-string'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { MemberRole } from '@prisma/client'
import { TServerWithMembersAndProfiles } from '@/types'
import { ModalType, useModal } from '@/hooks/use-modal-store'
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import UserAvatar from '@/components/user-avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const iconRoles = {
  GUEST: null,
  ADMIN: <ShieldAlert className='h-4 w-4 text-rose-500' />,
  MODERATOR: <ShieldCheck className='h-4 w-4 text-indigo-500' />,
}

const ManageMembersModal = () => {
  const router = useRouter()
  const { isOpen, type, onClose, data, onOpen } = useModal()
  const { server } = data as { server: TServerWithMembersAndProfiles }
  const isModalOpen = isOpen && type === ModalType.MANAGE_MEMBERS

  const [loadingId, setLoadingId] = useState('')

  const handleKickMember = async (memberId: string) => {
    try {
      setLoadingId(memberId)
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}/delete`,
        query: {
          serverId: server?.id,
        },
      })
      const res = await axios.delete(url)

      router.refresh()
      onOpen(ModalType.MANAGE_MEMBERS, { server: res.data })
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingId('')
    }
  }

  const handleChangeRole = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId)
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}/change-role`,
        query: {
          serverId: server?.id,
        },
      })
      const res = await axios.patch(url, { role })

      router.refresh()
      onOpen(ModalType.MANAGE_MEMBERS, { server: res.data })
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingId('')
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent className='overflow-hidden rounded-md bg-white text-black shadow-md'>
        <DialogHeader className='pt-4'>
          <DialogTitle className='text-center text-xl font-bold'>
            Manage Members
          </DialogTitle>
          <DialogDescription className='text-center text-neutral-600'>
            {server?.members?.length} members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='mt-4 max-h-[400px]'>
          <div className='flex flex-col'>
            {server?.members?.map((member) => (
              <div
                key={member.id}
                className='mb-4 flex items-center gap-x-2 overflow-hidden rounded-md p-2'
              >
                <UserAvatar src={member.profile.imageUrl} />
                <div className='flex flex-col items-start gap-y-1 text-xs font-semibold'>
                  <div className='flex items-center gap-x-1'>
                    {member.profile.name}
                    {iconRoles[member.role]}
                  </div>
                  <p className='text-xs text-zinc-500'>
                    {member.profile.email}
                  </p>
                </div>
                {server.profileId !== member.profileId &&
                  loadingId !== member.id && (
                    <div className='ml-auto'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className='cursor-pointer rounded-md p-2 transition hover:bg-zinc-200/50'>
                            <MoreVertical className='h-5 w-5 cursor-pointer text-zinc-500' />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side='left'>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger className='flex items-center'>
                              <ShieldCheck className='mr-2 h-4 w-4' />
                              <span>Role</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleChangeRole(
                                      member.id,
                                      MemberRole.GUEST
                                    )
                                  }
                                >
                                  <Shield className='mr-2 h-4 w-4' />
                                  <span>Guest</span>
                                  {member.role === MemberRole.GUEST && (
                                    <Check className='ml-auto h-4 w-4' />
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleChangeRole(
                                      member.id,
                                      MemberRole.MODERATOR
                                    )
                                  }
                                >
                                  <ShieldCheck className='mr-2 h-4 w-4' />
                                  <span>Moderator</span>
                                  {member.role === MemberRole.MODERATOR && (
                                    <Check className='ml-auto h-4 w-4' />
                                  )}
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuItem
                            onClick={() => handleKickMember(member.id)}
                            className='mt-1 flex items-center'
                          >
                            <Gavel className='mr-2 h-4 w-4' />
                            <span className='text-sm font-semibold'>Kick</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                {loadingId === member.id && (
                  <Loader2 className='ml-auto h-5 w-5 animate-spin text-zinc-500' />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default ManageMembersModal
