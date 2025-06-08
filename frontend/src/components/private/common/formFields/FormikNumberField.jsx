import { Field, ErrorMessage } from 'formik'
import PropTypes from 'prop-types'

export const FormikNumberField = ({ name, label, min, max, step, placeholder }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Field
        id={name}
        name={name}
        type="number"
        className="form-control"
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} component="div" className="text-danger small mt-1" />
    </div>
  )
}

FormikNumberField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  placeholder: PropTypes.string,
}

FormikNumberField.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  placeholder: '',
}
