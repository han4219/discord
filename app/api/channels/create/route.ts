import { currentProfile } from '@/lib/currentProfile'
import { db } from '@/lib/db'
import { MemberRole } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get('serverId')
    const { name, type } = await req.json()

    if (!serverId || !name || !type) {
      return new NextResponse(
        'Missing Server ID or Channel Name or Channel Type',
        { status: 400 }
      )
    }

    if (name === 'general') {
      return new NextResponse("Channel name can not be 'general'", {
        status: 400,
      })
    }

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
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
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
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            name,
            type,
            profileId: profile.id,
          },
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log(error, 'ERROR_CREATE_CHANNEL')
    return new NextResponse('Internal Error', { status: 500 })
  }
}
