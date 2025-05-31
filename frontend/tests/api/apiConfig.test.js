import MockAdapter from 'axios-mock-adapter'
import ApiConfig from '../../src/api/apiConfig'
import axiosInstance from '../../src/api/axiosInstance'
import '@testing-library/jest-dom'

const mock = new MockAdapter(axiosInstance)

describe('apiConfig', () => {
  afterEach(() => {
    mock.reset()
  })

  it('should fetch all users', async () => {
    const mockData = [{ id: 1, name: 'John Doe' }]
    mock.onGet('/api/users').reply(200, mockData)

    const response = await ApiConfig.getAllUsers()
    expect(response.data).toEqual(mockData)
  })

  it('should fetch a single user by ID', async () => {
    const mockData = { id: 1, name: 'John Doe' }
    mock.onGet('/api/users/1').reply(200, mockData)

    const response = await ApiConfig.getUserById(1)
    expect(response.data).toEqual(mockData)
  })

  it('should create a new user', async () => {
    const newUser = { name: 'Jane Doe' }
    const mockResponse = { id: 2, ...newUser }
    mock.onPost('/api/users', newUser).reply(201, mockResponse)

    const response = await ApiConfig.createUser(newUser)
    expect(response.data).toEqual(mockResponse)
  })

  it('should update an incident priority and status and return only data', async () => {
    const updatedIncident = { priority: 'high', status: 'open' }
    const mockResponse = { id: 1, ...updatedIncident }
    mock.onPatch('/api/incidents/1/priority-status', updatedIncident).reply(200, mockResponse)

    const response = await ApiConfig.updateIncidentPriorityAndStatus(1, 'high', 'open')
    expect(response).toEqual(mockResponse) // Expect just the data, not full response
  })

  it('should fetch incidents by user ID with full response', async () => {
    const mockData = { id: 1, status: 'resolved' }
    mock.onGet('/api/incidents/by-user-id/1').reply(200, mockData)

    const response = await ApiConfig.getIncidentsByUserId(1)
    expect(response.data).toEqual(mockData)
  })

  it('should handle errors when the API request fails', async () => {
    mock.onGet('/api/users').reply(500)

    await expect(ApiConfig.getAllUsers()).rejects.toThrow()
  })

  // Additional test cases for better coverage
  it('should update a user', async () => {
    const userData = { name: 'Updated Name' }
    const mockResponse = { id: 1, ...userData }
    mock.onPut('/api/users/1', userData).reply(200, mockResponse)

    const response = await ApiConfig.updateUser(1, userData)
    expect(response.data).toEqual(mockResponse)
  })

  it('should delete a user', async () => {
    mock.onDelete('/api/users/1').reply(204)

    await expect(ApiConfig.deleteUser(1)).resolves.not.toThrow()
  })

  it('should fetch incidents with technician names', async () => {
    const mockData = [{ id: 1, technician: 'John Doe' }]
    mock.onGet('/api/incidents/with-technician-name-not-closed').reply(200, mockData)

    const response = await ApiConfig.getAllIncidentsWithTechnicianName()
    expect(response.data).toEqual(mockData)
  })

  it('should login a user', async () => {
    const loginData = { email: 'test@example.com', password: 'password' }
    const mockResponse = { token: 'abc123' }
    mock.onPost('/login', loginData).reply(200, mockResponse)

    const response = await ApiConfig.loginUser(loginData)
    expect(response.data).toEqual(mockResponse)
  })
})
