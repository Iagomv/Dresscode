export const ClothingTypeList = ({ typeList, selectedType, setSelectedType }) => {
  if (!typeList) return null

  return (
    <div className="d-flex">
      <ul className="list-group list-group-horizontal">
        {typeList.map((type) => (
          <li
            key={type}
            className={`list-group-item ${selectedType === type ? 'active' : ''}`}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </li>
        ))}
      </ul>
    </div>
  )
}
