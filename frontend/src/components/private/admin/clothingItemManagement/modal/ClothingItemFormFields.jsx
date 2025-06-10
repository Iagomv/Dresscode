import React from 'react'
import { FormikTextField } from '../../../common/formFields/FormikTextField'
import { FormikSelectField } from '../../../common/formFields/FormikSelectField'
import { FormikImageField } from '../../../common/formFields/FormikImageField'
import { useTranslation } from 'react-i18next'
import { FormikNumberField } from '../../../common/formFields/FormikNumberField'

export const ClothingItemFormFields = () => {
  const { t } = useTranslation('common')

  // Labels
  const nameLabel = t('clothingItem.data.name')
  const descriptionLabel = t('clothingItem.data.description')
  const imageUrlLabel = t('clothingItem.data.imageUrl')
  const quantityLabel = t('clothingItem.data.quantity')
  const colorLabel = t('clothingItem.data.color')
  const priceLabel = t('clothingItem.data.price')
  const stateLabel = t('clothingItem.data.state')
  const genderLabel = t('clothingItem.data.gender')
  const typeLabel = t('clothingItem.data.type')
  const sizeLabel = t('clothingItem.data.size')
  const availabilityLabel = t('clothingItem.data.availability')

  // Options (enums)
  const stateOptions = [
    { value: 'NEW', label: t('clothingItem.state.new') },
    { value: 'USED', label: t('clothingItem.state.used') },
  ]

  const genderOptions = [
    { value: 'MALE', label: t('clothingItem.gender.male') },
    { value: 'FEMALE', label: t('clothingItem.gender.female') },
    { value: 'UNISEX', label: t('clothingItem.gender.unisex') },
  ]

  const typeOptions = [
    { value: 'PANTS', label: t('clothingItem.type.pants') },
    { value: 'SHIRT', label: t('clothingItem.type.shirt') },
    { value: 'JACKET', label: t('clothingItem.type.jacket') },
    { value: 'DRESS', label: t('clothingItem.type.dress') },
    { value: 'SKIRT', label: t('clothingItem.type.skirt') },
    { value: 'SHOES', label: t('clothingItem.type.shoes') },
    { value: 'HAT', label: t('clothingItem.type.hat') },
    { value: 'BELT', label: t('clothingItem.type.belt') },
  ]

  const sizeOptions = [
    { value: '6', label: '6' },
    { value: '8', label: '8' },
    { value: '10', label: '10' },
    { value: '12', label: '12' },
    { value: '14', label: '14' },
    { value: 'XS', label: 'XS' },
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' },
    { value: 'XXL', label: 'XXL' },
  ]

  const availabilityOptions = [
    { value: 'AVAILABLE', label: t('clothingItem.availability.available') },
    { value: 'UNAVAILABLE', label: t('clothingItem.availability.unavailable') },
    { value: 'LOST', label: t('clothingItem.availability.lost') },
    { value: 'SOLD', label: t('clothingItem.availability.sold') },
    { value: 'RESERVED', label: t('clothingItem.availability.reserved') },
  ]

  return (
    <div>
      <div className="row g-3">
        <div className="col-md-6">
          <FormikTextField name="name" label={nameLabel} type="text" className="form-control" />
        </div>
        <div className="col-md-6">
          <FormikTextField name="color" label={colorLabel} type="text" className="form-control" />
        </div>
        <div className="col-12">
          <FormikTextField name="description" label={descriptionLabel} type="text" className="form-control" />
        </div>
        <div className="col-md-6">
          <FormikNumberField
            name="quantity"
            label={quantityLabel}
            min="0"
            max={100}
            step="5"
            placeholder="5"
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <FormikNumberField
            name="price"
            label={priceLabel}
            type="number"
            min="0"
            max={1000}
            step="0.01"
            placeholder="10"
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <FormikSelectField name="state" label={stateLabel} options={stateOptions} className="form-select" />
        </div>
        <div className="col-md-6">
          <FormikSelectField name="gender" label={genderLabel} options={genderOptions} className="form-select" />
        </div>
        <div className="col-md-6">
          <FormikSelectField name="type" label={typeLabel} options={typeOptions} className="form-select" />
        </div>
        <div className="col-md-6">
          <FormikSelectField name="size" label={sizeLabel} options={sizeOptions} className="form-select" />
        </div>
        <div className="col-md-6">
          <FormikSelectField
            name="availability"
            label={availabilityLabel}
            options={availabilityOptions}
            className="form-select"
          />
        </div>
        <div className="col-12">
          <FormikImageField name="imageUrl" label={imageUrlLabel} className="form-control" />
        </div>
      </div>
    </div>
  )
}
