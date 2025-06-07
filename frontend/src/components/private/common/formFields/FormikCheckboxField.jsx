import { Field, ErrorMessage } from 'formik'

export const FormikCheckboxField = ({ name, label, ...props }) => {
  return (
    <div className="mb-3 form-check">
      <Field id={name} name={name} type="checkbox" className="form-check-input" {...props} />
      <label htmlFor={name} className="form-check-label">
        {label}
      </label>
      <ErrorMessage name={name} component="div" className="text-danger small mt-1" />
    </div>
  )
}
