import { currentProfile } from '@/lib/currentProfile'
import { db } from '@/lib/db'
import { MemberRole } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  const channelId = params.channelId
  const { searchParams } = new URL(req.url)
  const serverId = searchParams.get('serverId')

  if (!channelId || !serverId) {
    return new NextResponse('Invalid Channel ID or Server ID.', { status: 400 })
  }

  try {
    const { name, type } = await req.json()
    const profile = await currentProfile()

    if (name === 'general') {
      return new NextResponse("Name cannot be 'general'", { status: 400 })
    }

    if (!profile) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    const server = await db.server.update({
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
      data: {
        channels: {
          update: {
            where: {
              id: channelId,
              name: {
                not: 'general',
              },
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log('ERROR_UPDATE_CHANNEL', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
