import { currentProfile } from '@/lib/currentProfile'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  const serverId = params.serverId

  if (!serverId) {
    return new NextResponse('Missing Server ID.', { status: 400 })
  }

  try {
    const profile = await currentProfile()

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const foundServer = await db.server.findUnique({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
    })

    if (!foundServer) {
      return new NextResponse('No Valid Server Found.', { status: 403 })
    }

    const server = await db.server.update({
      where: {
        id: foundServer.id,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log(error, 'ERROR_LEAVE_SERVER')
    return new NextResponse('Internal Error', { status: 500 })
  }
}
