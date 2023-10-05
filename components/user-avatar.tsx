'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface Props {
  src: string
  className?: string
}

const UserAvatar = ({ src, className }: Props) => {
  return (
    <Avatar className={cn('h-7 w-7 md:h-10 md:w-10', className)}>
      <AvatarImage src={src} className='' alt='Avatar' />
      <AvatarFallback className='font-bold text-white'>A</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
