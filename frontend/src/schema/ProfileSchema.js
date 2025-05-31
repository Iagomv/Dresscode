import * as Yup from 'yup'

export const profileChangeSchema = Yup.object().shape({
  username: Yup.string().min(6).max(20).required('Required'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zñÑ0-9@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  email: Yup.string().email('Invalid email'),
})

export const passwordChangeSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zñÑ0-9@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),

  newPassword: Yup.string()
    .required('Required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zñÑ0-9@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .test(
      'not-same-as-current',
      'New password must be different from current password',
      function (value) {
        return value !== this.parent.currentPassword
      }
    ),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Required'),
})
