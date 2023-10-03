import { Channel, Member, Profile, Server } from '@prisma/client'

type TServerWithMembersAndProfiles = Server & {
  members: ({ profile: Profile } & Member)[]
  channels: Channel[]
}

export default TServerWithMembersAndProfiles
