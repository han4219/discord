import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { currentProfile } from '@/lib/currentProfile'

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { serverId: string }
  }
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

    const server = await db.server.delete({
      where: {
        id: serverId,
        profileId: profile.id,
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log(error, 'ERROR_DELETE_SERVER')
    return new NextResponse('Internal Error', { status: 500 })
  }
}
