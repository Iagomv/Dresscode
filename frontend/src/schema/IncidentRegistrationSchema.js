import * as Yup from 'yup'

export const IncidentRegistrationSchema = Yup.object({
  title: Yup.string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be at most 100 characters')
    .required('Title is required'),
  description: Yup.string()
    .max(500, 'Description must be at most 500 characters')
    .required('Description is required'),
  category: Yup.string()
    .oneOf(['HARDWARE', 'SOFTWARE', 'OTHER'])
    .required('Category is required'),
  priority: Yup.string()
    .oneOf(['LOW', 'MEDIUM', 'HIGH'])
    .required('Priority is required'),
  status: Yup.string()
    .oneOf(['OPEN', 'IN_PROGRESS', 'CLOSED'])
    .required('Status is required'),
})

export default IncidentRegistrationSchema
