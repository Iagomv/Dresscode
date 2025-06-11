export const ClothingSizeList = ({ sizeList, selectedSize, setSelectedSize }) => {
  if (!sizeList) return null

  return (
    <div className="d-flex">
      <ul className="list-group list-group-horizontal">
        {sizeList.map((size) => (
          <li
            key={size}
            className={`list-group-item ${selectedSize === size ? 'active' : ''}`}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </li>
        ))}
      </ul>
    </div>
  )
}
