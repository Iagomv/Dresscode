import './TypeList.css'

import { useTranslation } from 'react-i18next'

export const TypeList = ({ typeList, selectedType, onTypeSelect }) => {
  const { t } = useTranslation('common')
  if (!typeList) return null

  return (
    <ul className="list-group list-group-horizontal mb-0">
      {typeList.map((type) => (
        <li
          key={type}
          className={`list-group-item custom-list-group-item ${selectedType === type ? 'active' : ''}`}
          onClick={() => onTypeSelect(type)}
          style={{ cursor: 'pointer' }}
        >
          {t(`clothingItem.type.${type.toLowerCase()}`)}
        </li>
      ))}
    </ul>
  )
}
