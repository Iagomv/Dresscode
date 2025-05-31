import * as Yup from 'yup'

export const editUserSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, 'Username must be at least 6 characters')
    .max(20, 'Username cannot be more than 20 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  role: Yup.string()
    .required('Role is required')
    .oneOf(['USER', 'TECHNICIAN', 'ADMIN'], 'Invalid role'),
})

export const createUserSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, 'Username must be at least 6 characters')
    .max(20, 'Username cannot be more than 20 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  role: Yup.string()
    .required('Role is required')
    .oneOf(['USER', 'TECHNICIAN', 'ADMIN'], 'Invalid role'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zñÑ0-9@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase, lowercase, number, and special character'
    )
    .required('Password is required'),
})
