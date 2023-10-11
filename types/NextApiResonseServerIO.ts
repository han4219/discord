import { NextApiResponse } from 'next'
import { Socket, Server as NetServer } from 'net'
import { Server as SocketIoServer } from 'socket.io'

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIoServer
    }
  }
}
