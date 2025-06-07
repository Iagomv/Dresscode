import { Field, ErrorMessage } from 'formik'

export const FormikSelectField = ({ name, label, options }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Field id={name} name={name} as="select" className="form-select">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component="div" className="text-danger small mt-1" />
    </div>
  )
}
