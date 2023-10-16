import { getAuth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { NextApiRequest } from 'next'

export const currentProfilePages = async (req: NextApiRequest) => {
  const { userId } = getAuth(req)

  if (!userId) {
    return null
  }

  const foundProfile = await db.profile.findUnique({
    where: {
      userId,
    },
  })

  return foundProfile
}
