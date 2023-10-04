'use client'

import * as z from 'zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createServerSchema } from '@/lib/zodSchema'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import FileUpload from '@/components/file-upload'
import { useRouter } from 'next/navigation'
import { ModalType, useModal } from '@/hooks/use-modal-store'
import { useEffect } from 'react'

type TCreateServer = z.infer<typeof createServerSchema>

const EditServerModal = () => {
  const router = useRouter()
  const {
    isOpen,
    type,
    onClose,
    data: { server },
  } = useModal()
  const form = useForm<TCreateServer>({
    defaultValues: {
      name: '',
      imageUrl: '',
    },
    resolver: zodResolver(createServerSchema),
  })

  const isLoading = form.formState.isSubmitting
  const isModalOpen = isOpen && type === ModalType.EDIT_SERVER

  useEffect(() => {
    if (server) {
      form.setValue('name', server.name)
      form.setValue('imageUrl', server.imageUrl)
    }
  }, [server, form])

  const onSubmit = async (values: TCreateServer) => {
    try {
      await axios.patch(`/api/servers/${server?.id}/update-server`, values)
      form.reset()
      router.refresh()
      onClose()
    } catch (error) {
      console.log(error, 'Failed to update server.')
    }
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
            Edit your server
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-600'>
            Edit your server with name and an image. You can always change it
            later.
          </DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <div className='flex items-center justify-center pt-3 text-center'>
                <FormField
                  control={form.control}
                  name='imageUrl'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint='serverImage'
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className='px-6'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                        Server name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className='border-0 bg-zinc-300/50 text-black outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                          placeholder='Enter server name...'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='text-red-600' />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className='bg-gray-100 px-6 py-4'>
                <Button disabled={isLoading} type='submit' variant='primary'>
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default EditServerModal
