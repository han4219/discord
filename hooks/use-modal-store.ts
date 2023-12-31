import { Channel, ChannelType, Server } from '@prisma/client'
import { create } from 'zustand'

export enum ModalType {
  CREATE_SERVER = 'CREATE_SERVER',
  INVITE_MEMBER = 'INVITE_MEMBER',
  EDIT_SERVER = 'EDIT_SERVER',
  MANAGE_MEMBERS = 'MANAGE_MEMBERS',
  CREATE_CHANNEL = 'CREATE_CHANNEL',
  LEAVE_SERVER = 'LEAVE_SERVER',
  DELETE_SERVER = 'DELETE_SERVER',
  EDIT_CHANNEL = 'EDIT_CHANNEL',
  DELETE_CHANNEL = 'DELETE_CHANNEL',
  MESSAGE_FILE = 'MESSAGE_FILE',
}

interface ModalStoreData {
  server?: Server
  channel?: Channel
  channelType?: ChannelType
  apiUrl?: string
  query?: Record<string, any>
}

interface ModalStore {
  data: ModalStoreData
  isOpen: boolean
  type: ModalType | null
  onClose: () => void
  onOpen: (type: ModalType, data?: ModalStoreData) => void
}

export const useModal = create<ModalStore>()((set) => ({
  data: {},
  isOpen: false,
  type: null,
  onOpen: (type, data = {}) => set(() => ({ isOpen: true, type, data })),
  onClose: () => set(() => ({ isOpen: false, type: null })),
}))
