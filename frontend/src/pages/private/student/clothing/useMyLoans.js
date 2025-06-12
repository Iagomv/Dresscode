import { useState, useEffect } from 'react'
import { loanService } from '../../../../service/loanService'

export const useMyLoans = () => {
  const [myLoans, setMyLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [showLoans, setShowLoans] = useState(false)

  const fetchMyLoans = async () => {
    try {
      setLoading(true)
      const data = await loanService.fetchMyLoans()
      setMyLoans(data)
    } catch (error) {
      console.error('Failed to load loans:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMyLoans()
  }, [])

  return { myLoans, loadingMyLoans: loading, showLoans, setShowLoans }
}
