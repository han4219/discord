import { currentProfile } from '@/lib/currentProfile'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  if (!params.serverId) {
    return new NextResponse('Server ID Missing', { status: 400 })
  }

  try {
    const { name, imageUrl } = await req.json()

    if (!name || !imageUrl) {
      return new NextResponse('Missing server name or server image', {
        status: 400,
      })
    }

    const profile = await currentProfile()

    if (!profile) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    const foundServer = await db.server.findUnique({
      where: {
        id: params.serverId,
      },
    })

    if (!foundServer) {
      return new NextResponse('Server ID Invalid', { status: 403 })
    }

    const updatedServer = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    })

    return NextResponse.json(updatedServer)
  } catch (error) {
    console.log(error, 'ERROR_UPDATE_SERVER_FAILED')
    return new NextResponse('Internal Error', { status: 500 })
  }
}
