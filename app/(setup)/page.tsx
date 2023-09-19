import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { initialProfile } from '@/lib/initialProfile'

const SetupPage = async () => {
  const profile = await initialProfile()

  const foundServer = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  })

  if (foundServer) {
    return redirect(`/servers/${foundServer.id}`)
  }

  return <div>Create a Server</div>
}

export default SetupPage
