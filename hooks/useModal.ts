import { create } from 'zustand'

export enum ModalType {
  CREATE_SERVER = 'CREATE_SERVER',
}

interface ModalState {
  isOpen: boolean
  type: ModalType | null
  onOpen: (type: ModalType) => void
  onClose: () => void
}

export const useModal = create<ModalState>()((set) => ({
  isOpen: false,
  type: null,
  onOpen: (type) => set(() => ({ isOpen: true, type })),
  onClose: () => set(() => ({ isOpen: false, type: null })),
}))
