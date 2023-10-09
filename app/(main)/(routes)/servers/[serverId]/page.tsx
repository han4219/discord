import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { redirectToSignIn } from '@clerk/nextjs'
import { currentProfile } from '@/lib/currentProfile'

const ServerIdPage = async ({ params }: { params: { serverId: string } }) => {
  const profile = await currentProfile()
  if (!profile) {
    return redirectToSignIn()
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: {
            equals: 'general',
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  })

  const initialChannel = server?.channels[0]

  if (initialChannel?.name !== 'general') {
    return null
  }

  return redirect(`/servers/${params.serverId}/channels/${initialChannel.id}`)
}

export default ServerIdPage
