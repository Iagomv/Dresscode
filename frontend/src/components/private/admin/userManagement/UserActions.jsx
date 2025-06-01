import React, { useState, useRef, useEffect } from 'react'
import { FiMoreHorizontal, FiEdit2, FiToggleLeft, FiTrash2 } from 'react-icons/fi'

export const UserActions = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleMenu = () => setIsOpen((prev) => !prev)

  return (
    <div ref={dropdownRef} className="relative flex items-center">
      {!isOpen ? (
        <button onClick={toggleMenu} aria-label="User actions" className="p-1 text-gray-500 ">
          <FiMoreHorizontal className="w-3 h-3" />
        </button>
      ) : (
        <>
          <button aria-label="Edit" className="p-2 " title="Edit">
            <FiEdit2 />
          </button>
          <button aria-label="Toggle status" className="p-2" title="Toggle Status">
            <FiToggleLeft />
          </button>
          <button aria-label="Delete" className="p-2" title="Delete">
            <FiTrash2 />
          </button>
        </>
      )}
    </div>
  )
}
