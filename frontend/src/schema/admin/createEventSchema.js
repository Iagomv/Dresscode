import * as Yup from 'yup'
// Validation schema for the event form
export const createEventSchema = (t) =>
  Yup.object().shape({
    title: Yup.string()
      .min(3, t('title.min', { min: 3 }))
      .max(100, t('title.max'))
      .required(t('title.required')),
    description: Yup.string().min(10, t('description.min')).max(1000, t('description.max')).required(t('description.required')),
    location: Yup.string().max(100, t('location.max')).required(t('location.required')),
    eventDate: Yup.date().required(t('date.required')),
    category: Yup.string().oneOf(['PUBLIC', 'PRIVATE'], t('category.invalid')).required(t('category.required')),
    status: Yup.string()
      .oneOf(['DRAFT', 'PUBLISHED', 'CANCELLED', 'ARCHIVED'], t('status.invalid'))
      .required(t('status.required')),
    image: Yup.mixed().test('fileType', t('image.valid'), (value) => {
      if (!value) return true
      return ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'image/webp'].includes(value.type)
    }),
  })
