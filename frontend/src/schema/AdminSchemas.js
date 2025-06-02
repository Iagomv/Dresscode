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


export const createUserSchema = (t) => 
  Yup.object({
    name: Yup.string().required(t('validation:name_required')),
    lastName: Yup.string(),
    email: Yup.string()
      .email(t('validation:email_invalid'))
      .required(t('validation:email_required')),
    phoneNumber: Yup.number()
      .typeError(t('validation:phone_integer'))
      .nullable()
      .transform((value, originalValue) => (originalValue.trim() === '' ? null : value)),
    role: Yup.string()
      .oneOf(['STUDENT', 'TEACHER', 'ADMIN'], t('validation:invalid_role'))
      .required(t('validation:role_required')),
    password: Yup.string()
      .required(t('validation:password_required'))
      .min(8, t('validation:password_min'))
      .max(128, t('validation:password_max'))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
        t('validation:password_pattern')
      ),
  })

