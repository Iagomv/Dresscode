import axiosInstance from './axiosInstance'
import axios from 'axios'
import { TOKEN_KEY } from '../constants/textConstants'
import { LoanRequestDto, AdminLoanRequestDto } from '../dto/loanDtos'
const API_BASE_URL = '/api'

const handleRequest = async (method, url, data = null, params = null) => {
  try {
    const config = {
      method,
      url,
      ...(data && { data }),
      ...(params && { params }),
    }
    const response = await axiosInstance(config)
    return response.data
  } catch (error) {
    console.error(`Error with ${method.toUpperCase()} request to ${url}:`, error)
    throw error
  }
}

export class ApiConfig {
  // ** User Endpoints **
  static getAllUsers() {
    return handleRequest('get', `${API_BASE_URL}/users`)
  }

  static getUserById(id) {
    return handleRequest('get', `${API_BASE_URL}/users/${id}`)
  }
  static getUsersByActive(flag) {
    return handleRequest('get', `${API_BASE_URL}/users/active`, null, { flag })
  }

  static createUser(userData) {
    return handleRequest('post', `${API_BASE_URL}/users`, userData)
  }
  static adminUserCreation(userData) {
    return handleRequest('post', `${API_BASE_URL}/users/admin-user-creation`, userData)
  }

  static updateUser(id, userData) {
    return handleRequest('put', `${API_BASE_URL}/users/${id}`, userData)
  }

  static toggleUserStatus(id) {
    return handleRequest('patch', `${API_BASE_URL}/users/${id}/toggle-status`)
  }

  static deleteUser(id) {
    return handleRequest('delete', `${API_BASE_URL}/users/${id}`)
  }

  // ** Loan Endpoints **
  static getAllLoans() {
    return handleRequest('get', `${API_BASE_URL}/loans`)
  }
  static getAllLoansWithUserInfo() {
    return handleRequest('get', `${API_BASE_URL}/loans/with-added-info`)
  }

  static getLoanById(id) {
    return handleRequest('get', `${API_BASE_URL}/loans/${id}`)
  }

  static getLoansByUserId(userId) {
    return handleRequest('get', `${API_BASE_URL}/loans/user/${userId}`)
  }

  static requestLoan(LoanRequestDto) {
    return handleRequest('post', `${API_BASE_URL}/loans`, LoanRequestDto)
  }

  static createLoanAsAdmin(AdminLoanRequestDto) {
    return handleRequest('post', `${API_BASE_URL}/loans/admin`, AdminLoanRequestDto)
  }

  static updateLoan(id, AdminLoanRequestDto) {
    return handleRequest('put', `${API_BASE_URL}/loans/admin/${id}`, AdminLoanRequestDto)
  }

  static deleteLoan(id) {
    return handleRequest('delete', `${API_BASE_URL}/loans/${id}`)
  }

  static getMyLoans() {
    return handleRequest('get', `${API_BASE_URL}/loans/my-loans`)
  }

  // ** ClothingItem Endpoints **

  static searchClothingItems(searchDto) {
    return handleRequest('post', `${API_BASE_URL}/clothing-items/search`, searchDto)
  }

  static getAllClothingItems() {
    return handleRequest('get', `${API_BASE_URL}/clothing-items`)
  }
  static getAllAvailableClothingItems() {
    return handleRequest('get', `${API_BASE_URL}/clothing-items/available`)
  }

  static getClothingItemById(id) {
    return handleRequest('get', `${API_BASE_URL}/clothing-items/${id}`)
  }

  static createClothingItem(itemData) {
    return handleRequest('post', `${API_BASE_URL}/clothing-items`, itemData)
  }

  static updateClothingItem(id, itemData) {
    return handleRequest('put', `${API_BASE_URL}/clothing-items/${id}`, itemData)
  }

  static deleteClothingItem(id) {
    return handleRequest('delete', `${API_BASE_URL}/clothing-items/${id}`)
  }

  // ** Event Endpoints **
  static getAllEvents() {
    return handleRequest('get', `${API_BASE_URL}/events`)
  }
  static getMyEvents() {
    return handleRequest('get', `${API_BASE_URL}/events/my-events`)
  }
  static getEventById(id) {
    return handleRequest('get', `${API_BASE_URL}/events/${id}`)
  }
  static getEventsByCategoryAndStatus(category, status) {
    return handleRequest('post', `${API_BASE_URL}/events/by-category-and-status`, (category, status))
  }

  static createEvent(eventData) {
    return handleRequest('post', `${API_BASE_URL}/events`, eventData)
  }

  static updateEvent(id, eventData) {
    return handleRequest('put', `${API_BASE_URL}/events/${id}`, eventData)
  }

  static deleteEvent(id) {
    return handleRequest('delete', `${API_BASE_URL}/events/${id}`)
  }

  // ** Clase Endpoints **
  static getAllClases() {
    return handleRequest('get', `${API_BASE_URL}/clases`)
  }

  static getClaseById(id) {
    return handleRequest('get', `${API_BASE_URL}/clases/${id}`)
  }

  static insertClase(claseData) {
    return handleRequest('post', `${API_BASE_URL}/clases`, claseData)
  }

  static updateClase(id, claseData) {
    return handleRequest('patch', `${API_BASE_URL}/clases/${id}`, claseData)
  }

  static deleteClase(id) {
    return handleRequest('delete', `${API_BASE_URL}/clases/${id}`)
  }

  static getClaseUsers(claseId) {
    return handleRequest('get', `${API_BASE_URL}/clases/users/${claseId}`)
  }

  // ** Authentication Endpoints **
  static registerUser(registerData) {
    return handleRequest('post', `${API_BASE_URL}/auth/register`, registerData)
  }

  static loginUser(loginData) {
    return handleRequest('post', `${API_BASE_URL}/auth/login`, loginData)
  }
  static validateToken(token) {
    return handleRequest('post', `${API_BASE_URL}/auth/validate`, token)
  }

  // ** Image Endpoints **

  static async uploadImage(imageData, title, category) {
    const formData = new FormData()
    formData.append('file', imageData)
    formData.append('title', title)
    formData.append('category', category)

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/images/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      },
    })
    return response.data
  }
}
export default ApiConfig
