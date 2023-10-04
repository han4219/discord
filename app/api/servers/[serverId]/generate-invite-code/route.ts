import { db } from '@/lib/db'
import { v4 as uuidv4 } from 'uuid'
import { currentProfile } from '@/lib/currentProfile'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  const serverId = params.serverId

  try {
    const profile = await currentProfile()
    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!serverId) {
      return new NextResponse('Server ID Missing', { status: 400 })
    }

    const foundServer = await db.server.findUnique({
      where: {
        id: serverId,
      },
    })

    if (!foundServer) {
      return new NextResponse('Server ID Invalid', { status: 403 })
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log(error, 'ERROR_GENERATE_INVITATE_CODE')
    return new NextResponse('Internal Error', { status: 500 })
  }
}
