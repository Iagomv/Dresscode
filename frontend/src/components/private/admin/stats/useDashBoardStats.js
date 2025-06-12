import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { statsService } from '../../../../service/statsService'

export const useDashBoardStats = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  const [userStats, setUserStats] = useState({})
  const [loansStats, setLoansStats] = useState({})
  const [eventsStats, setEventsStats] = useState({})
  const { t } = useTranslation('common')

  useEffect(() => {
    async function fetchStats() {
      setLoading(true)
      try {
        const [users, events, loans] = await Promise.all([
          statsService.fetchUserStats(),
          statsService.fetchEventStats(),
          statsService.fetchLoanStats(),
        ])
        setUserStats(users)
        setLoansStats(loans)
        setEventsStats(events)
        setData({ users, events, loans })
      } catch (error) {
        toast.error(t('error.fetch'))
        console.error('Failed to fetch dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return { userStats, loansStats, eventsStats, data, loading }
}
