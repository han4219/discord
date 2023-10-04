'use client'

import { useEffect, useState } from 'react'
import CreateServerModal from '@/components/modals/create-server-modal'
import InviteMemberModal from '@/components/modals/invite-member-modal'
import EditServerModal from '@/components/modals/edit-server-modal'

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <CreateServerModal />
      <InviteMemberModal />
      <EditServerModal />
    </>
  )
}

export default ModalProvider
