'use client'

import * as z from 'zod'
import axios from 'axios'
import qs from 'query-string'
import React, { useMemo } from 'react'
import { Plus, Smile } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { chatInputSchema } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import ActionTooltip from '../action-tooltip'
import { ModalType, useModal } from '@/hooks/use-modal-store'

type TChatInput = z.infer<typeof chatInputSchema>

interface Props {
  apiUrl: string
  type: 'channel' | 'conversation'
  name: string
  query: Record<string, any>
}

const ChatInput = ({ apiUrl, type, name, query }: Props) => {
  const { onOpen } = useModal()
  const form = useForm<TChatInput>({
    defaultValues: {
      content: '',
    },
    resolver: zodResolver(chatInputSchema),
  })

  const isLoading = useMemo(() => {
    return form.formState.isSubmitting
  }, [form.formState])

  const onSubmit = async (values: TChatInput) => {
    try {
      const url = qs.stringifyUrl({
        url: '/api/socket/message',
        query,
      })

      await axios.post(url, values)
    } catch (error) {
      console.log(error, 'failed to send message')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='relative flex w-full items-center rounded-md p-4'>
                  <ActionTooltip
                    label='Attach an file'
                    children={
                      <button
                        type='button'
                        onClick={() =>
                          onOpen(ModalType.MESSAGE_FILE, { apiUrl, query })
                        }
                        className='absolute left-8 top-7 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-500 p-1 transition hover:bg-zinc-600 dark:bg-zinc-400 dark:hover:bg-zinc-300'
                      >
                        <Plus className='text-white dark:text-[#313338]' />
                      </button>
                    }
                  />
                  <Input
                    disabled={isLoading}
                    placeholder={`Message ${
                      type === 'conversation' ? name : '#' + name
                    }`}
                    className='border-0 bg-zinc-200/90 px-14 py-6 text-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-zinc-700/75 dark:text-zinc-200'
                    {...field}
                  />
                  <div className='absolute right-8 top-7'>
                    <Smile />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default ChatInput
