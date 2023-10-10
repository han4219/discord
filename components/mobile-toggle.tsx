import React from 'react'
import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import ServerSidebar from '@/components/sidebar/server/server-sidebar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import NavigationSidebar from '@/components/sidebar/navigation/navigation-sidebar'

const MobileToggle = ({ serverId }: { serverId: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='md:hidden'>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='flex gap-0 p-0'>
        <div className='w-[72px]'>
          <NavigationSidebar />
        </div>
        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  )
}

export default MobileToggle
