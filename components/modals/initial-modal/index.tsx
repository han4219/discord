'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { createServerSchema } from '@/lib/zodSchema'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import FileUpload from '@/components/file-upload'

type TCreateServer = z.infer<typeof createServerSchema>

const InitialModal = () => {
  const form = useForm<TCreateServer>({
    defaultValues: {
      name: '',
      imageUrl: ''
    },
    resolver: zodResolver(createServerSchema)
  })
  const [isMounted, setIsMounted] = useState(false)

  const isLoading = form.formState.isSubmitting

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onSubmit = async (values: TCreateServer) => {
    console.log(values, 'values submitted.')
  }

  if (!isMounted) {
    return null
  }

  return (
    <Dialog open>
      <DialogContent className='bg-white text-black p-0 overflow-hidden rounded-md shadow-md'>
        <DialogHeader className='pt-8'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Customize your server
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-600'>
            Give your server a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <div className='flex items-center justify-center text-center pt-3'>
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
                      <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
                        Server name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className='bg-zinc-300/50 border-0 outline-none focus-visible:ring-0 text-black focus-visible:ring-offset-0'
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

export default InitialModal
