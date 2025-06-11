import './ClothingTypeList.css'

import { useTranslation } from 'react-i18next'
import { CartBadgeProps } from '../../../common/badges/clothingItem/CartBadgeProps'
export const ClothingTypeList = ({ typeList, selectedType, setSelectedType, loanList, setShowCart, showCart }) => {
  const { t } = useTranslation('common')
  if (!typeList) return null
  const onCardClick = (type) => {
    setShowCart(false)
    setSelectedType(type)
  }
  return (
    <div className="bg-white shadow-sm w-100 mb-3">
      <div className="d-flex flex-row align-items-center justify-content-around px-3">
        <ul className="list-group list-group-horizontal mb-0">
          {typeList.map((type) => (
            <li
              key={type}
              className={`list-group-item custom-list-group-item ${selectedType === type ? 'active' : ''}`}
              onClick={() => onCardClick(type)}
              style={{ cursor: 'pointer' }}
            >
              {t(`clothingItem.type.${type.toLowerCase()}`)}
            </li>
          ))}
        </ul>
        <CartBadgeProps count={loanList?.length} setShowCart={setShowCart} showCart={showCart} />
      </div>
    </div>
  )
}
