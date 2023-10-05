'use client'

import axios from 'axios'
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

const DeleteServerModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    isOpen,
    type,
    onClose,
    data: { server },
  } = useModal()
  const router = useRouter()
  const isModalOpen = isOpen && type === ModalType.DELETE_SERVER

  const handleLeaveServer = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/servers/${server?.id}/delete`)

      onClose()
      router.refresh()
      router.push('/')
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
            Delete Server
          </DialogTitle>
          <DialogDescription className='mb-4 text-center'>
            Are you sure you want to do this?
            <br />
            <span className='font-semibold text-indigo-500'>
              {server?.name}
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
                onClick={handleLeaveServer}
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

export default DeleteServerModal
