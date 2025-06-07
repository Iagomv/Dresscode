import { Field, ErrorMessage } from 'formik'
export const FormikTextField = ({ name, label, type }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Field id={name} name={name} type={type} className="form-control" />
      <ErrorMessage name={name} component="div" className="text-danger small mt-1" />
    </div>
  )
}
