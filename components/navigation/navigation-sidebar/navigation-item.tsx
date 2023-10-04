'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useParams, useRouter } from 'next/navigation'
import ActionTooltip from '@/components/action-tooltip'

interface Props {
  id: string
  name: string
  imageUrl: string
}

const NavigationItem = ({ id, name, imageUrl }: Props) => {
  const params = useParams()
  const router = useRouter()

  const handleClick = () => {
    router.push(`/servers/${id}`)
  }

  return (
    <ActionTooltip
      align='center'
      side='right'
      label={name}
      children={
        <button
          onClick={handleClick}
          className='group relative mb-4 flex items-center'
        >
          <div
            className={cn(
              'absolute left-0 w-1 rounded-r-full bg-primary transition-all',
              params?.serverId === id ? 'h-10' : 'h-2 group-hover:h-5'
            )}
          />
          <div
            className={cn(
              'group relative mx-3 flex h-12 w-12 overflow-hidden rounded-[24px] transition-all group-hover:rounded-[16px]',
              params?.serverId === id &&
                'rounded-[16px] bg-primary/10 text-primary'
            )}
          >
            <Image alt='Channel' src={imageUrl} fill sizes='null' />
          </div>
        </button>
      }
    />
  )
}

export default NavigationItem
