import * as Yup from 'yup'

export const createLoanSchema = (t) =>
  Yup.object().shape({
    userId: Yup.number()
      .required(t('validation:loan.userId.required'))
      .integer(t('validation:loan.userId.integer'))
      .min(1, t('validation:loan.userId.min', { min: 1 })),

    acceptedById: Yup.number()
      .nullable()
      .integer(t('validation:loan.acceptedById.integer'))
      .min(1, t('validation:loan.acceptedById.min', { min: 1 })),

    startingDate: Yup.string()
      .nullable()
      .matches(/^\d{4}-\d{2}-\d{2}$/, t('validation:loan.startingDate.format')),

    endingDate: Yup.string()
      .nullable()
      .matches(/^\d{4}-\d{2}-\d{2}$/, t('validation:loan.endingDate.format')),

    state: Yup.string()
      .oneOf(['ACTIVE', 'PENDING', 'REJECTED', 'RETURNED', 'EXPIRED'], t('validation:loan.state.invalid'))
      .nullable(),

    clothingItemIds: Yup.array()
      .of(
        Yup.number()
          .integer(t('validation:loan.clothingItemIds.integer'))
          .min(1, t('validation:loan.clothingItemIds.min', { min: 1 }))
      )
      .required(t('validation:loan.clothingItemIds.required'))
      .min(1, t('validation:loan.clothingItemIds.minLength', { min: 1 })),
  })
