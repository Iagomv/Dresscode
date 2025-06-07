import React from 'react'
import { ErrorMessage, useFormikContext } from 'formik'

export const FormikImageField = ({ name, label }) => {
  const { setFieldValue } = useFormikContext()

  const handleChange = (event) => {
    const file = event.currentTarget.files[0]
    setFieldValue(name, file)
  }

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input id={name} name={name} type="file" className="form-control" onChange={handleChange} />
      <ErrorMessage name={name} component="div" className="text-danger small mt-1" />
    </div>
  )
}
