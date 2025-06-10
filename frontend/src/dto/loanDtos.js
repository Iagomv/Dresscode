// loanDtos.js

/**
 * DTO for users to create a new loan request.
 *
 * @typedef {Object} LoanRequestDto
 * @property {number[]} clothingItemIds - Array of clothing item IDs requested (required).
 */
export const LoanRequestDto = {
  /** @type {number[]} */
  clothingItemIds: [],
}

/**
 * DTO for admin to create or update a loan with full control.
 *
 * @typedef {Object} AdminLoanRequestDto
 * @property {number|null} userId - ID of the user making the loan (required).
 * @property {number|null} acceptedById - ID of the admin who accepted the loan (optional).
 * @property {string} startingDate - Starting date of the loan in ISO format (YYYY-MM-DD) (optional).
 * @property {string} endingDate - Ending date of the loan in ISO format (YYYY-MM-DD) (optional).
 * @property {string} state - Loan state, e.g. 'PENDING', 'ACTIVE', 'RETURNED' (optional).
 * @property {number[]} clothingItemIds - Array of clothing item IDs involved (required).
 */
export const AdminLoanRequestDto = {
  /** @type {number|null} */
  userId: null,

  /** @type {number|null} */
  acceptedById: null,

  /** @type {string} */
  startingDate: '',

  /** @type {string} */
  endingDate: '',

  /** @type {string} */
  state: '',

  /** @type {number[]} */
  clothingItemIds: [],
}
