import React, { useState, useEffect } from 'react'
import ApiConfig from '../../../../../api/ApiConfig'
import { toast } from 'react-toastify'
/**
 * Custom hook to fetch and provide user and clothing item data for loan forms.
 * Fetches all users and clothing items from the API and transforms them into
 * options for select fields. Manages loading and error states during data fetching.
 *
 * @returns {Object} An object containing:
 * - users: Array of all user objects.
 * - items: Array of all clothing item objects.
 * - userOptions: Formatted user options for select inputs.
 * - itemOptions: Formatted item options for select inputs.
 * - loading: Boolean indicating if data is being loaded.
 */
export const useLoanFormFields = () => {
  const [users, setUsers] = useState([])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        setLoading(true)

        const [usersResponse, itemsResponse] = await Promise.all([
          ApiConfig.getUsersByActive(true),
          ApiConfig.getAllAvailableClothingItems({ signal: controller.signal }),
        ])

        if (isMounted) {
          setUsers(usersResponse)
          setItems(itemsResponse)
        }
      } catch (err) {
        if (isMounted && err.name !== 'AbortError') {
          toast.error(err.message)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const userOptions = users.map((user) => ({
    value: user.id,
    label: `${user.name} (${user.email})`,
  }))

  const itemOptions = items.map((item) => ({
    value: item.id,
    label: `${item.name}`,
    data: item,
  }))

  return {
    users,
    items,
    userOptions,
    itemOptions,
    loading,
  }
}
