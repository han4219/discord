import React from 'react'

const ServerIdPage = async ({ params }: { params: { serverId: string } }) => {
  return <div>ServerId: {params.serverId}</div>
}

export default ServerIdPage
