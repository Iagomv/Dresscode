import axiosInstance from './axiosInstance'
import axios from 'axios'
import { TOKEN_KEY } from '../constants/textConstants'
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

  static getLoanById(id) {
    return handleRequest('get', `${API_BASE_URL}/loans/${id}`)
  }

  static getLoansByUserId(userId) {
    return handleRequest('get', `${API_BASE_URL}/loans/user/${userId}`)
  }

  static createLoan(loanData) {
    return handleRequest('post', `${API_BASE_URL}/loans`, loanData)
  }

  static updateLoan(id, loanData) {
    return handleRequest('put', `${API_BASE_URL}/loans/${id}`, loanData)
  }

  static deleteLoan(id) {
    return handleRequest('delete', `${API_BASE_URL}/loans/${id}`)
  }

  // ** Event Endpoints **
  static getAllEvents() {
    return handleRequest('get', `${API_BASE_URL}/events`)
  }
  static getEventById(id) {
    return handleRequest('get', `${API_BASE_URL}/events/${id}`)
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

  //! ** Clothing Item Endpoints **
  static getAllClothingItems() {
    return handleRequest('get', `${API_BASE_URL}/clothing-items`)
  }

  static getClothingItemById(id) {
    return handleRequest('get', `${API_BASE_URL}/clothing-items/${id}`)
  }

  static createClothingItem(itemData) {
    return handleRequest('post', `${API_BASE_URL}/clothing-items`, itemData)
  }

  static updateClothingItem(id, itemData) {
    return handleRequest('patch', `${API_BASE_URL}/clothing-items/${id}`, itemData)
  }

  static deleteClothingItem(id) {
    return handleRequest('delete', `${API_BASE_URL}/clothing-items/${id}`)
  }

  static searchClothingItems(queryParams) {
    // queryParams is an object { size, color, availability, state, ciCode }
    return handleRequest('get', `${API_BASE_URL}/clothing-items/search`, null, queryParams)
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

  static async uploadImage(imageData, title) {
    const formData = new FormData()
    formData.append('file', imageData)
    formData.append('title', title)

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
