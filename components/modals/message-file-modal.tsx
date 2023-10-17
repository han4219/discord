'use client'

import * as z from 'zod'
import axios from 'axios'
import qs from 'query-string'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ModalType, useModal } from '@/hooks/use-modal-store'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import FileUpload from '@/components/file-upload'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'

const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: 'File is required!',
  }),
})

type TMessageFile = z.infer<typeof formSchema>

const MessageFileModal = () => {
  const { isOpen, onClose, data, type } = useModal()
  const form = useForm<TMessageFile>({
    defaultValues: {
      fileUrl: '',
    },
    resolver: zodResolver(formSchema),
  })

  const isModalOpen = isOpen && type === ModalType.MESSAGE_FILE

  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const isLoading = form.formState.isSubmitting

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onSubmit = async (values: TMessageFile) => {
    try {
      const url = qs.stringifyUrl({
        url: data.apiUrl || '',
        query: data.query,
      })

      const res = await axios.post(url, {
        ...values,
        content: values.fileUrl,
      })
      router.refresh()
      handleClose()
    } catch (error) {
      console.log(error, 'send message file failed.')
    }
  }

  if (!isMounted) {
    return null
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className='overflow-hidden rounded-md bg-white p-0 text-black shadow-md'>
        <DialogHeader className='pt-8'>
          <DialogTitle className='text-center text-2xl font-bold'>
            Add an attachment
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-600'>
            Send a file as a message.
          </DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <div className='flex items-center justify-center pt-3 text-center'>
                <FormField
                  control={form.control}
                  name='fileUrl'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint='messageFile'
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className='bg-gray-100 px-6 py-4'>
                <Button disabled={isLoading} type='submit' variant='primary'>
                  Send
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default MessageFileModal
