import { useFormik } from 'formik'

// eslint-disable-next-line no-unused-vars
export const useUpdateLoan = (loan, onUpdate, onClose) => {
  const formik = useFormik({
    initialValues: {
      id: loan?.id,
      userId: loan?.user?.id || '',
      startingDate: loan?.startingDate || '',
      endingDate: loan?.endingDate || '',
      state: loan?.state || '',
      clothingItemIds: loan?.clothingItems ? loan.clothingItems.map((item) => item.id) : [],
    },
    onSubmit: async (values) => {
      await onUpdate(values)
    },
    enableReinitialize: true,
  })

  return { formik }
}
