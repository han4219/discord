'use client'

import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface Props {
  label: string
  children: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'center' | 'start' | 'end'
}

const ActionTooltip: React.FC<Props> = ({ label, children, side, align }) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent align={align} side={side}>
          <p className='text-sm font-semibold capitalize'>
            {label.toLowerCase()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ActionTooltip
