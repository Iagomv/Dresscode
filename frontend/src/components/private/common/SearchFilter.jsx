import { Input } from '@mui/material'
import { FaSearch } from 'react-icons/fa'

export const SearchFilter = ({ searchTerm, onSearchChange, placeholderText }) => {
  const handleChange = (e) => onSearchChange(e.target.value)

  return (
    <div className="d-flex flex-row gap-3">
      <Input type="text" placeholder={placeholderText} value={searchTerm} onChange={handleChange} />
      <FaSearch className="mt-2" />
    </div>
  )
}
