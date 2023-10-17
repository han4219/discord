import React from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Smile } from 'lucide-react'
import { useTheme } from 'next-themes'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface Props {
  onEmojiChange(emoji: string): void
}

const EmojiPicker = ({ onEmojiChange }: Props) => {
  const { resolvedTheme } = useTheme()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Smile className='cursor-pointer text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300' />
      </PopoverTrigger>
      <PopoverContent
        side='right'
        sideOffset={40}
        className='mb-16 border-0 bg-transparent shadow-none outline-none drop-shadow-none'
      >
        <Picker
          data={data}
          onEmojiSelect={(emoji: any) => onEmojiChange(emoji.native)}
          theme={resolvedTheme}
        />
      </PopoverContent>
    </Popover>
  )
}

export default EmojiPicker
