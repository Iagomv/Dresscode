import { useState, useEffect, useCallback } from 'react'
import { enumService } from '../../../../service/enumService'
import { useTranslation } from 'react-i18next'
import { performApiAction } from '../../../../utils/ApiUtils'

export const useStudentClothing = () => {
  const [enums, setEnums] = useState([])
  const [clothingItems, setClothingItems] = useState([])
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation('common')
  const errorMessage = `${t('error.fetch')}`

  const fetchEnums = useCallback(
    async () => performApiAction(enumService.fetchClothingItemEnums, { errorMessage, setLoading }),
    [errorMessage, setLoading]
  )

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEnums()
      setEnums(data)
    }
    fetchData()
  }, [fetchEnums])

  return { loading, enums, clothingItems, setClothingItems }
}
