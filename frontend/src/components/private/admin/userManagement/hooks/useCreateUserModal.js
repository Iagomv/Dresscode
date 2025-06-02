import { useState } from 'react'
import { useFormik } from 'formik'
import { createUserSchema } from '../../../../../schema/AdminSchemas'
import { useTranslation } from 'react-i18next'
export const useCreateUserModal = (onCreate, onClose) => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  const openModal = () => setIsOpen(true)
  const closeModal = () => {
    setIsOpen(false)
    onClose && onClose()
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      role: 'STUDENT',
      active: true,
      password: '',
    },
    validationSchema: createUserSchema(t),
    onSubmit: (values) => {
      const phoneNumber = values.phoneNumber
        ? parseInt(values.phoneNumber, 10)
        : null
      onCreate({ ...values, phoneNumber })
      closeModal()
    },
  })

  return {
    isOpen,
    openModal,
    closeModal,
    formik,
  }
}
