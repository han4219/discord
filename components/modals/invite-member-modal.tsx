'use client'

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from '@/components/ui/dialog'

import { ModalType, useModal } from '@/hooks/use-modal-store'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Copy, RefreshCcw } from 'lucide-react'
import useOriginLink from '@/hooks/user-origin-link'

const InviteMemberModal = () => {
  const originLink = useOriginLink()
  const { isOpen, type, onClose, data } = useModal()

  const isModalOpen = isOpen && type === ModalType.INVITE_MEMBER
  const inviteLink = `${originLink}/invite/${data.server?.inviteCode}`

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className='overflow-hidden rounded-md bg-white p-0 text-black shadow-md'>
        <DialogHeader className='pt-8'>
          <DialogTitle className='text-center text-xl font-bold'>
            Invite friends to {data.server?.name}
          </DialogTitle>
        </DialogHeader>
        <div className='p-6'>
          <Label className='text-sm font-bold uppercase text-neutral-700'>
            Server invite link
          </Label>
          <div className='mt-2 flex items-center gap-2'>
            <Input
              className='border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0'
              value={inviteLink}
            />
            <Button size='icon'>
              <Copy className='h-4 w-4' />
            </Button>
          </div>
          <Button
            size='sm'
            className='mt-4 text-sm text-zinc-500'
            variant='link'
          >
            Generate a new link
            <RefreshCcw className='ml-2 h-4 w-4' />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

//TODO: write api to generate new link
// create page to handle accept invite link when user enter and access that link

export default InviteMemberModal
