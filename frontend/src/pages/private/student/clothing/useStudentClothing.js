import { useState, useEffect, useCallback } from 'react'
import { enumService } from '../../../../service/enumService'
import { useTranslation } from 'react-i18next'
import { performApiAction } from '../../../../utils/ApiUtils'
import { toast } from 'react-toastify'
import { clothingItemService } from '../../../../service/clothingItemService'

const LOAN_LIST_STORAGE_KEY = 'loanList'

export const useStudentClothing = () => {
  const { t } = useTranslation('common')
  const errorMessage = `${t('error.fetch')}`
  const successMessage = `${t('student:content.static.vestuario.successLoanRequest')}`

  const [enums, setEnums] = useState([])
  const [clothingItems, setClothingItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedType, setSelectedType] = useState(null)
  const [showCart, setShowCart] = useState(false)

  // Load loanList from localStorage on initial render
  const [loanList, setLoanList] = useState(() => {
    try {
      const saved = localStorage.getItem(LOAN_LIST_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Save loanList to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(LOAN_LIST_STORAGE_KEY, JSON.stringify(loanList))
    } catch {
      // Could add error logging here if needed
    }
  }, [loanList])

  const addToLoan = (item) => {
    setLoanList((prev) => {
      if (prev.find((i) => i.id === item.id)) {
        toast.error(t('student:content.static.vestuario.itemAlreadyOnCart'))
        return prev
      }
      return [...prev, item]
    })
  }

  const removeFromLoan = (id) => {
    setLoanList((prev) => prev.filter((item) => item.id !== id))
  }

  const fetchEnums = useCallback(
    async () =>
      performApiAction(enumService.fetchClothingItemEnums, {
        errorMessage,
        setLoading,
      }),
    [errorMessage, setLoading]
  )

  const requestLoan = async () => {
    const payload = {
      clothingItemIds: loanList.map((item) => item.id),
    }

    await performApiAction(() => clothingItemService.requestLoan(payload), {
      errorMessage,
      successMessage,
      setLoading,
    })

    setLoanList([])
    localStorage.removeItem(LOAN_LIST_STORAGE_KEY)
  }

  const searchClothingItems = useCallback(
    async (searchDto) =>
      performApiAction(() => clothingItemService.searchClothingItems(searchDto), {
        errorMessage,
        setLoading,
      }),
    [errorMessage, setLoading]
  )

  useEffect(() => {
    const fetchData = async () => {
      const data = await searchClothingItems({ type: selectedType })
      setClothingItems(data)
    }
    fetchData()
  }, [searchClothingItems, selectedType])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEnums()
      setEnums(data)
    }
    fetchData()
  }, [fetchEnums])

  return {
    loading,
    enums,
    clothingItems,
    setClothingItems,
    selectedType,
    setSelectedType,
    loanList,
    setLoanList,
    addToLoan,
    requestLoan,
    showCart,
    setShowCart,
    removeFromLoan,
  }
}
