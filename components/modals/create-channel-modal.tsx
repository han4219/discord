'use client'

import * as z from 'zod'
import axios from 'axios'
import qs from 'query-string'
import { useForm } from 'react-hook-form'
import { useParams, useRouter } from 'next/navigation'
import { ChannelType } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { createChannelSchema } from '@/lib/zodSchema'
import { ModalType, useModal } from '@/hooks/use-modal-store'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
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
import { useEffect } from 'react'

type TCreateChannel = z.infer<typeof createChannelSchema>

const CreateChannelModal = () => {
  const router = useRouter()
  const params = useParams()
  const { isOpen, type, onClose, data } = useModal()
  const form = useForm<TCreateChannel>({
    defaultValues: {
      name: '',
      type: data.channelType || ChannelType.TEXT,
    },
    resolver: zodResolver(createChannelSchema),
  })

  useEffect(() => {
    if (data.channelType) {
      form.setValue('type', data.channelType)
    } else {
      form.setValue('type', ChannelType.TEXT)
    }
  }, [form, data.channelType])

  const isLoading = form.formState.isSubmitting
  const isModalOpen = isOpen && type === ModalType.CREATE_CHANNEL

  const onSubmit = async (values: TCreateChannel) => {
    try {
      const url = qs.stringifyUrl({
        url: '/api/channels/create',
        query: {
          serverId: params?.serverId,
        },
      })

      await axios.post(url, values)
      form.reset()
      router.refresh()
      onClose()
    } catch (error) {
      console.log(error, 'create channel failed.')
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
            Create Channel
          </DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <div className='flex flex-col gap-4 px-6'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-semibold capitalize text-zinc-500 dark:text-secondary/80'>
                        channel name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className='border-0 bg-zinc-300/50 text-black outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                          placeholder='Enter channel name...'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='text-red-600' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='type'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-semibold capitalize text-zinc-500 dark:text-secondary/80'>
                        channel type
                      </FormLabel>
                      <Select
                        disabled={isLoading}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className='border-0 bg-zinc-300/50 capitalize outline-none focus:ring-0 focus:ring-offset-0'>
                            <SelectValue placeholder='Select a channel type' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(ChannelType).map((type, index) => (
                            <SelectItem
                              className='capitalize'
                              key={index}
                              value={type}
                            >
                              {type.toLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className='bg-gray-100 px-6 py-4'>
                <Button disabled={isLoading} type='submit' variant='primary'>
                  Create
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CreateChannelModal
