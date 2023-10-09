'use client'

import React from 'react'
import { Plus } from 'lucide-react'
import ActionTooltip from '@/components/action-tooltip'
import { ModalType, useModal } from '@/hooks/use-modal-store'

const NavigationAction = () => {
  const { onOpen } = useModal()

  return (
    <div>
      <ActionTooltip
        side='right'
        align='center'
        label='Add a server'
        children={
          <button
            className='group'
            onClick={() => onOpen(ModalType.CREATE_SERVER)}
          >
            <div className='mx-3 flex h-[48px] w-[48px] items-center justify-center rounded-[24px] bg-background transition-all group-hover:rounded-[15px] group-hover:bg-emerald-500 dark:bg-neutral-700 '>
              <Plus
                className='text-emerald-500 transition group-hover:text-white'
                size={25}
              />
            </div>
          </button>
        }
      />
    </div>
  )
}

export default NavigationAction
