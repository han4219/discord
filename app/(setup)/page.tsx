import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { initialProfile } from '@/lib/initialProfile'
import InitialModal from '@/components/modals/initial-modal'

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

  return <InitialModal />
}

export default SetupPage
