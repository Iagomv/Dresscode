import React from 'react'
import { useField } from 'formik'

export const FormikSelectField = ({ name, label, options, isSearchable = false, isMulti = false }) => {
  const [field, meta, helpers] = useField(name)

  const handleChange = (event) => {
    if (isMulti) {
      // Get selected options as an array of values
      const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value)
      helpers.setValue(selectedOptions)
    } else {
      helpers.setValue(event.target.value)
    }
  }

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        id={name}
        name={name}
        multiple={isMulti}
        searchable={isSearchable}
        value={field.value}
        onChange={handleChange}
        onBlur={field.onBlur}
        className="form-select"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? <div className="text-danger small mt-1">{meta.error}</div> : null}
    </div>
  )
}
