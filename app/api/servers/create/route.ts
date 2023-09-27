import { db } from '@/lib/db'
import { v4 as uuidv4 } from 'uuid'
import { currentProfile } from '@/lib/currentProfile'
import { NextResponse } from 'next/server'
import { MemberRole } from '@prisma/client'

export async function POST(req: Request) {
  const { name, imageUrl } = await req.json()
  const profile = await currentProfile()

  if (!profile) {
    return new NextResponse('UNAUTHORIZED', { status: 401 })
  }

  try {
    const server = await db.server.create({
      data: {
        name,
        imageUrl,
        inviteCode: uuidv4(),
        profileId: profile.id,
        channels: {
          create: [{ name: 'general', profileId: profile.id }]
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }]
        }
      }
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log('[SERVERS_POST]', error)
    return new NextResponse('INTERNAL ERROR', { status: 500 })
  }
}
