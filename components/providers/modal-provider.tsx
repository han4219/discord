'use client'

import { useEffect, useState } from 'react'
import CreateServerModal from '@/components/modals/create-server-modal'
import InviteMemberModal from '@/components/modals/invite-member-modal'
import EditServerModal from '@/components/modals/edit-server-modal'
import ManageMembersModal from '@/components/modals/manage-members-modal'
import CreateChannelModal from '@/components/modals/create-channel-modal'
import LeaveServerModal from '@/components/modals/leave-server-modal'
import DeleteServerModal from '@/components/modals/delete-server-modal'
import EditChannelModal from '@/components/modals/edit-channel-modal'

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
      <ManageMembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <EditChannelModal />
    </>
  )
}

export default ModalProvider
