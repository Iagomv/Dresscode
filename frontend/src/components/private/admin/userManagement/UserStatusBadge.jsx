import React from 'react'
import { FaCheck, FaXmark } from 'react-icons/fa6'
export const UserStatusBadge = ({ active }) => <span>{active ? <FaCheck /> : <FaXmark />}</span>
