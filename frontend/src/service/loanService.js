import ApiConfig from '../api/ApiConfig'
export const loanService = {
  fetchMyLoans: async () => {
    return await ApiConfig.getMyLoans()
  },
  fetchAllLoans: async () => {
    return await ApiConfig.getAllLoans()
  },

  requestLoan: async (LoanRequestDto) => {
    return ApiConfig.requestLoan({ LoanRequestDto })
  },
  createLoanAsAdmin: async (AdminLoanRequestDto) => {
    const requestDto = { ...AdminLoanRequestDto }

    // Safely parse clothing item IDs
    if (Array.isArray(requestDto.clothingItemIds)) {
      requestDto.clothingItemIds = requestDto.clothingItemIds.map((id) => {
        const parsed = parseInt(id, 10)
        return isNaN(parsed) ? id : parsed // Fallback to original if parsing fails
      })
    } else if (typeof requestDto.clothingItemIds === 'string') {
      // Handle single ID string case
      const parsed = parseInt(requestDto.clothingItemIds, 10)
      requestDto.clothingItemIds = isNaN(parsed) ? [] : [parsed]
    } else {
      requestDto.clothingItemIds = []
    }

    return ApiConfig.createLoanAsAdmin(requestDto)
  },

  updateLoan: async (id, AdminLoanRequestDto) => {
    return await ApiConfig.updateLoan(id, AdminLoanRequestDto)
  },

  deleteLoan: async (id) => {
    return await ApiConfig.deleteLoan(id)
  },
}
