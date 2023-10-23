import { NextResponse } from 'next/server'
import { currentProfile } from '@/lib/currentProfile'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const cursor = searchParams.get('cursor')
    const channelId = searchParams.get('cursor')

    const profile = await currentProfile()

    if (!profile) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }
  } catch (error) {
    console.log(error, 'ERROR_GET_MESSAGES')
    return new NextResponse('Something went wrong!', { status: 500 })
  }
}
