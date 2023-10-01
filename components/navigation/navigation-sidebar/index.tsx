import React from 'react'
import { currentProfile } from '@/lib/currentProfile'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import NavigationAction from '@/components/navigation/navigation-sidebar/navigation-action'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import NavigationItem from '@/components/navigation/navigation-sidebar/navigation-item'
import { UserButton } from '@clerk/nextjs'
import { ModeToggle } from '@/components/mode-toggle'

const NavigationSidebar = async () => {
  const profile = await currentProfile()

  if (!profile) {
    return redirect('/')
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  return (
    <div className='flex h-full w-full flex-col items-center space-y-4 border-r py-3 text-primary shadow-sm dark:bg-[#1E1F22]'>
      <NavigationAction />
      <Separator className='mx-auto h-[2px] w-8 rounded-xl bg-zinc-600 dark:bg-zinc-200' />
      <ScrollArea className='flex-1'>
        {servers.map(({ id, name, imageUrl }) => (
          <NavigationItem id={id} name={name} imageUrl={imageUrl} key={id} />
        ))}
      </ScrollArea>
      <Separator className='mx-auto h-[2px] w-8 rounded-xl bg-zinc-600 dark:bg-zinc-200' />
      <div className='mt-auto flex flex-col items-center gap-y-4 pb-3'>
        <ModeToggle triggerClassName='w-12 h-12' />
        <UserButton
          afterSignOutUrl='/'
          appearance={{
            elements: {
              avatarBox: 'h-12 w-12',
            },
          }}
        />
      </div>
    </div>
  )
}

export default NavigationSidebar
