import { currentProfile } from '@/lib/currentProfile'
import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { memberId: string } }
) {
  const memberId = params.memberId
  const searchParams = req.nextUrl.searchParams
  const serverId = searchParams.get('serverId')

  if (!memberId || !serverId) {
    return new NextResponse('Invalid Member ID or Server ID.', { status: 400 })
  }

  try {
    const { role } = await req.json()

    const profile = await currentProfile()

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const foundServer = await db.server.findUnique({
      where: {
        id: serverId,
        members: {
          some: {
            id: memberId,
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
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: memberId,
              profileId: {
                not: profile.id,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: 'asc',
          },
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
