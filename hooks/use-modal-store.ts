import { Server } from '@prisma/client'
import { create } from 'zustand'

export enum ModalType {
  CREATE_SERVER = 'CREATE_SERVER',
  INVITE_MEMBER = 'INVITE_MEMBER',
  EDIT_SERVER = 'EDIT_SERVER',
}

interface ModalStoreData {
  server?: Server
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
