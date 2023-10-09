import { currentProfile } from '@/lib/currentProfile'
import { db } from '@/lib/db'
import { MemberRole } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function DELETE(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  const channelId = params.channelId
  const { searchParams } = new URL(req.url)
  const serverId = searchParams.get('serverId')

  if (!channelId || !serverId) {
    return new NextResponse('Invalid Channel ID or Server ID.', {
      status: 400,
    })
  }

  try {
    const profile = await currentProfile()

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
          delete: {
            id: channelId,
            name: {
              not: 'general',
            },
          },
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log('ERROR_DELETE_CHANNEL')
    return new NextResponse('Internal Error', { status: 500 })
  }
}
