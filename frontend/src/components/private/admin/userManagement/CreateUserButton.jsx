import React, { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { CreateUserModal } from './CreateUserModal'

export const CreateUserButton = ({ onCreate, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleCreate = async (userData) => {
    const success = await onCreate(userData)
    if (success) {
      setIsOpen(false)
      onSuccess()
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
      >
        <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
        Create User
      </button>
      <CreateUserModal isOpen={isOpen} onClose={() => setIsOpen(false)} onCreate={handleCreate} />
    </>
  )
}
