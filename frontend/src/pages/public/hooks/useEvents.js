import { useEffect, useState } from 'react'
import ApiConfig from '../../../api/ApiConfig'
import { toast } from 'react-toastify'

export const useEvents = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      try {
        const data = await ApiConfig.getMyEvents()
        setEvents(data)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return { events, loading }
}
