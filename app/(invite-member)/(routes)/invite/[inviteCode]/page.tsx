import { currentProfile } from '@/lib/currentProfile'
import { db } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const InviteMemberPage = async ({
  params,
}: {
  params: { inviteCode: string }
}) => {
  const inviteCode = params.inviteCode

  // check if user is not logged in
  const profile = await currentProfile()

  if (!profile) {
    return redirectToSignIn()
  }

  if (!params.inviteCode) {
    return redirect('/')
  }

  // check if user already join server
  const foundServer = await db.server.findFirst({
    where: {
      inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  if (foundServer) {
    return redirect(`/servers/${foundServer.id}`)
  }

  // If pass two step above, then join server
  const updatedServer = await db.server.update({
    where: {
      inviteCode,
    },
    data: {
      members: {
        create: {
          profileId: profile.id,
        },
      },
    },
  })

  if (updatedServer) {
    return redirect(`/servers/${updatedServer.id}`)
  }
  return null
}

export default InviteMemberPage
