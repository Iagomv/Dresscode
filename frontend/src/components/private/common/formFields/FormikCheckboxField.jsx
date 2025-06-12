import React from 'react'
import { useField } from 'formik'

export const FormikCheckBoxField = ({ name, label, value }) => {
  const [field, , helpers] = useField(name)
  const valueArray = Array.isArray(field.value) ? field.value : []
  const checked = valueArray.includes(value)

  const handleChange = () => {
    if (checked) {
      helpers.setValue(valueArray.filter((v) => v !== value))
    } else {
      helpers.setValue([...valueArray, value])
    }
  }

  return (
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id={`${name}-${value}`} checked={checked} onChange={handleChange} />
      <label className="form-check-label" htmlFor={`${name}-${value}`}>
        {label}
      </label>
    </div>
  )
}
