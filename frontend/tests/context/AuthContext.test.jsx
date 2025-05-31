import { renderHook, act } from '@testing-library/react'
import { AuthProvider, useAuth, decodeToken } from '../../src/context/AuthContext'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ApiConfig } from '../../src/api/apiConfig'

// Mock API
vi.mock('../../src/api/apiConfig', () => ({
  ApiConfig: {
    validateToken: vi.fn(),
  },
}))

const createTestToken = (payload = {}) => {
  const header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
  const basePayload = {
    sub: '123',
    name: 'Test User',
    authorities: ['USER'],
    exp: Math.floor(Date.now() / 1000) + 3600,
    iat: Math.floor(Date.now() / 1000),
    ...payload,
  }
  const payloadStr = btoa(JSON.stringify(basePayload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  const signature = 'test-signature'
  return `${header}.${payloadStr}.${signature}`
}

const wrapper = ({ children }) => (
  <MemoryRouter>
    <AuthProvider>{children}</AuthProvider>
  </MemoryRouter>
)

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should initialize with no authentication', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.auth).toBeNull()
  })

  describe('decodeToken', () => {
    it('should decode valid token', () => {
      const token = createTestToken()
      const decoded = decodeToken(token)
      expect(decoded).toMatchObject({
        sub: '123',
        name: 'Test User',
      })
    })

    it('should return null for expired token', () => {
      const token = createTestToken({
        exp: Math.floor(Date.now() / 1000) - 3600,
      })
      expect(decodeToken(token)).toBeNull()
    })

    it('should return null for invalid token', () => {
      expect(decodeToken('invalid.token')).toBeNull()
    })
  })

  describe('login', () => {
    it('should login with valid token', () => {
      const { result } = renderHook(() => useAuth(), { wrapper })
      const token = createTestToken()

      act(() => {
        result.current.login(token)
      })

      expect(result.current.isAuthenticated).toBe(true)
      expect(result.current.auth.token).toBe(token)
      expect(result.current.auth.user).toMatchObject({
        name: 'Test User',
        roles: ['USER'],
      })
      expect(localStorage.getItem('incidentManagementAuthToken')).toBe(token)
    })

    it('should logout when given invalid token', () => {
      const { result } = renderHook(() => useAuth(), { wrapper })

      act(() => {
        result.current.login('invalid.token')
      })

      expect(result.current.isAuthenticated).toBe(false)
      expect(localStorage.getItem('incidentManagementAuthToken')).toBeNull()
    })
  })

  describe('logout', () => {
    it('should clear auth state and localStorage', () => {
      const { result } = renderHook(() => useAuth(), { wrapper })
      const token = createTestToken()

      act(() => {
        result.current.login(token)
      })

      act(() => {
        result.current.logout()
      })

      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.auth).toBeNull()
      expect(localStorage.getItem('incidentManagementAuthToken')).toBeNull()
    })
  })

  describe('token validation', () => {
    it('should validate token on mount', async () => {
      const token = createTestToken()
      localStorage.setItem('incidentManagementAuthToken', token)
      ApiConfig.validateToken.mockResolvedValue({ user: { name: 'API User' } })

      const { result } = renderHook(() => useAuth(), { wrapper })

      await act(async () => {
        await vi.runAllTimersAsync()
      })

      expect(result.current.isAuthenticated).toBe(true)
      expect(result.current.auth.user.name).toBe('API User')
      expect(ApiConfig.validateToken).toHaveBeenCalledWith(token)
    })

    it('should logout if token validation fails', async () => {
      const token = createTestToken()
      localStorage.setItem('incidentManagementAuthToken', token)
      ApiConfig.validateToken.mockRejectedValue(new Error('Invalid token'))

      const { result } = renderHook(() => useAuth(), { wrapper })

      await act(async () => {
        await vi.runAllTimersAsync()
      })

      expect(result.current.isAuthenticated).toBe(false)
      expect(localStorage.getItem('incidentManagementAuthToken')).toBeNull()
    })
  })

  describe('auto logout', () => {
    it('should auto logout when token expires', () => {
      const token = createTestToken({ exp: Math.floor(Date.now() / 1000) + 1 })
      const { result } = renderHook(() => useAuth(), { wrapper })

      act(() => {
        result.current.login(token)
      })

      expect(result.current.isAuthenticated).toBe(true)

      act(() => {
        vi.advanceTimersByTime(2000)
      })

      expect(result.current.isAuthenticated).toBe(false)
    })
  })
})
