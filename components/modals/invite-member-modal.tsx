'use client'

import axios from 'axios'
import { useState } from 'react'
import { Check, Copy, RefreshCcw } from 'lucide-react'

import useOriginLink from '@/hooks/user-origin-link'
import { ModalType, useModal } from '@/hooks/use-modal-store'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

const InviteMemberModal = () => {
  const originLink = useOriginLink()
  const { isOpen, type, onClose, data, onOpen } = useModal()

  const [isGenerating, setIsGenerating] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const isModalOpen = isOpen && type === ModalType.INVITE_MEMBER
  const inviteLink = `${originLink}/invite/${data.server?.inviteCode}`

  const handleClose = () => {
    onClose()
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  const handleRefreshLink = async () => {
    try {
      setIsGenerating(true)
      const res = await axios.patch(
        `/api/servers/${data.server?.id}/generate-invite-code`
      )
      onOpen(ModalType.INVITE_MEMBER, { server: res.data })
    } catch (error) {
      console.log(error, 'failed to generate new link')
      alert('Failed to generate new link: ')
    } finally {
      setIsGenerating(false)
    }
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
              readOnly
              disabled={isGenerating}
              className='border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0'
              value={inviteLink}
            />
            <Button
              onClick={handleCopyLink}
              disabled={isGenerating}
              size='icon'
            >
              {isCopied ? (
                <Check className='h-4 w-4' />
              ) : (
                <Copy className='h-4 w-4' />
              )}
            </Button>
          </div>
          <Button
            disabled={isGenerating}
            size='sm'
            className='mt-4 text-sm text-zinc-500'
            variant='link'
            onClick={handleRefreshLink}
          >
            Generate a new link
            <RefreshCcw
              className={cn('ml-2 h-4 w-4', isGenerating && 'animate-spin')}
            />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InviteMemberModal
