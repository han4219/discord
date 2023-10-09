'use client'

import axios from 'axios'
import qs from 'query-string'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ModalType, useModal } from '@/hooks/use-modal-store'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'

const DeleteChannelModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    isOpen,
    type,
    onClose,
    data: { server, channel },
  } = useModal()
  const router = useRouter()
  const isModalOpen = isOpen && type === ModalType.DELETE_CHANNEL

  const handleDeleteChannel = async () => {
    try {
      setIsLoading(true)
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}/delete`,
        query: {
          serverId: server?.id,
        },
      })
      await axios.delete(url)

      onClose()
      router.refresh()
      router.push(`/servers/${server?.id}`)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent className='overflow-hidden rounded-md bg-white p-0 text-black shadow-md'>
        <DialogHeader className='pt-8'>
          <DialogTitle className='text-center text-xl font-bold'>
            Delete Channel
          </DialogTitle>
          <DialogDescription className='mb-4 text-center'>
            Are you sure you want to do this?
            <br />
            <span className='font-semibold text-indigo-500'>
              {channel?.name}
            </span>{' '}
            will be permanently deleted.
          </DialogDescription>
          <DialogFooter className='bg-gray-100 px-6 py-4'>
            <div className='flex w-full items-center justify-between'>
              <Button
                disabled={isLoading}
                onClick={() => onClose()}
                variant='ghost'
              >
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                onClick={handleDeleteChannel}
                variant='primary'
              >
                Confirm
              </Button>
            </div>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteChannelModal
