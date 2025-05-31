import { describe, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import AdminUserManagementPage from '../../../src/pages/admin/AdminUserManagementPage'
import * as AuthContext from '../../../src/context/AuthContext'
import ApiConfig from '../../../src/api/apiConfig'
import { toast } from 'react-toastify'

// Mock dependencies
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Navigate: ({ to }) => <div data-testid="navigate" data-to={to} />,
  }
})

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

vi.mock('../../../src/api/apiConfig', () => ({
  default: {
    getAllUsers: vi.fn(),
    updateUser: vi.fn(),
    createUser: vi.fn(),
    deleteUser: vi.fn(),
  },
}))

vi.mock('../../../src/context/AuthContext', () => ({
  useAuth: vi.fn(() => ({
    auth: {
      user: {
        authorities: ['ROLE_ADMIN'],
      },
    },
  })),
}))

vi.mock('../../../src/components/common/LoadingSpinner', () => ({
  default: () => <div data-testid="loading-spinner">Loading...</div>,
}))

vi.mock('../../../src/components/admin/userManagement/UsersTable', () => ({
  default: ({ users, onEdit, onDelete }) => (
    <div data-testid="users-table">
      <span>User Count: {users.length}</span>
      {users.map((user) => (
        <div key={user.id} data-testid={`user-${user.id}`}>
          <span>{user.username}</span>
          <button onClick={() => onEdit(user)} data-testid={`edit-${user.id}`}>
            Edit
          </button>
          <button onClick={() => onDelete(user.id)} data-testid={`delete-${user.id}`}>
            Delete
          </button>
        </div>
      ))}
    </div>
  ),
}))

vi.mock('../../../src/components/admin/userManagement/UserModal', () => ({
  default: ({ show, onHide, user, onSave, isSubmitting }) =>
    show ? (
      <div data-testid="user-modal">
        <span>Mode: {user ? 'Edit' : 'Create'}</span>
        {user && <span>Editing: {user.username}</span>}
        <button
          onClick={() => onSave({ username: 'newuser', email: 'new@example.com' })}
          disabled={isSubmitting}
          data-testid="save-button"
        >
          Save
        </button>
        <button onClick={onHide} data-testid="cancel-button">
          Cancel
        </button>
      </div>
    ) : null,
}))

const originalConfirm = window.confirm
beforeEach(() => {
  window.confirm = vi.fn()
})

afterEach(() => {
  window.confirm = originalConfirm
})

function setup(authOverride = {}) {
  const useAuthMock = vi.spyOn(AuthContext, 'useAuth')
  useAuthMock.mockImplementation(() => ({
    auth: {
      user: {
        authorities: ['ROLE_ADMIN'],
        ...authOverride.user,
      },
      ...authOverride,
    },
  }))

  return render(
    <MemoryRouter>
      <AdminUserManagementPage />
    </MemoryRouter>
  )
}

describe('AdminUserManagementPage', () => {
  const mockUsers = [
    { id: 1, username: 'admin', email: 'admin@example.com' },
    { id: 2, username: 'user1', email: 'user1@example.com' },
    { id: 3, username: 'user2', email: 'user2@example.com' },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    ApiConfig.getAllUsers.mockResolvedValue({ data: mockUsers })
  })

  it('redirects non-admin users to home page', async () => {
    const useAuthMock = vi.spyOn(AuthContext, 'useAuth')

    useAuthMock.mockImplementation(() => ({
      auth: {
        user: {
          authorities: ['ROLE_USER'],
        },
      },
    }))

    render(
      <MemoryRouter>
        <AdminUserManagementPage />
      </MemoryRouter>
    )

    expect(screen.getByTestId('navigate')).toBeInTheDocument()
    expect(screen.getByTestId('navigate')).toHaveAttribute('data-to', '/')
  })

  it('shows loading spinner while fetching users', () => {
    ApiConfig.getAllUsers.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)))

    setup()

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('renders user table after loading', async () => {
    setup()

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
    })

    expect(screen.getByTestId('users-table')).toBeInTheDocument()
    expect(screen.getByText('User Count: 3')).toBeInTheDocument()
    expect(screen.getByText('admin')).toBeInTheDocument()
    expect(screen.getByText('user1')).toBeInTheDocument()
    expect(screen.getByText('user2')).toBeInTheDocument()
  })

  it('handles API error when fetching users', async () => {
    ApiConfig.getAllUsers.mockRejectedValue({
      response: { data: { message: 'Failed to fetch users' } },
    })

    setup()

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
    })

    expect(toast.error).toHaveBeenCalledWith('Failed to fetch users')
  })

  it('opens modal in create mode when Create New User button is clicked', async () => {
    setup()

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
    })

    const createButton = screen.getByText('Create New User')
    await userEvent.click(createButton)

    expect(screen.getByTestId('user-modal')).toBeInTheDocument()
    expect(screen.getByText('Mode: Create')).toBeInTheDocument()
  })

  it('opens modal in edit mode when edit button is clicked', async () => {
    setup()

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
    })

    const editButton = screen.getByTestId('edit-1')
    await userEvent.click(editButton)

    expect(screen.getByTestId('user-modal')).toBeInTheDocument()
    expect(screen.getByText('Mode: Edit')).toBeInTheDocument()
    expect(screen.getByText('Editing: admin')).toBeInTheDocument()
  })

  it('creates a new user successfully', async () => {
    ApiConfig.createUser.mockResolvedValue({
      data: { id: 4, username: 'newuser' },
    })

    setup()

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
    })

    const createButton = screen.getByText('Create New User')
    await userEvent.click(createButton)

    const saveButton = screen.getByTestId('save-button')
    await userEvent.click(saveButton)

    expect(ApiConfig.createUser).toHaveBeenCalledWith({
      username: 'newuser',
      email: 'new@example.com',
    })
    expect(toast.success).toHaveBeenCalledWith('User created successfully')
    expect(ApiConfig.getAllUsers).toHaveBeenCalledTimes(2) // Initial load + after create
  })

  it('updates an existing user successfully', async () => {
    ApiConfig.updateUser.mockResolvedValue({
      data: { id: 1, username: 'updated' },
    })

    setup()

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
    })

    const editButton = screen.getByTestId('edit-1')
    await userEvent.click(editButton)

    const saveButton = screen.getByTestId('save-button')
    await userEvent.click(saveButton)

    expect(ApiConfig.updateUser).toHaveBeenCalledWith(1, {
      username: 'newuser',
      email: 'new@example.com',
    })
    expect(toast.success).toHaveBeenCalledWith('User updated successfully')
    expect(ApiConfig.getAllUsers).toHaveBeenCalledTimes(2) // Initial load + after update
  })

  it('handles error during user creation', async () => {
    ApiConfig.createUser.mockRejectedValue({
      response: { data: { message: 'Username already exists' } },
    })

    setup()

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
    })

    const createButton = screen.getByText('Create New User')
    await userEvent.click(createButton)

    const saveButton = screen.getByTestId('save-button')
    await userEvent.click(saveButton)

    expect(toast.error).toHaveBeenCalledWith('Username already exists')
  })

  it('deletes a user after confirmation', async () => {
    ApiConfig.deleteUser.mockResolvedValue({})
    window.confirm.mockReturnValue(true)

    setup()

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
    })

    const deleteButton = screen.getByTestId('delete-2')
    await userEvent.click(deleteButton)

    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this user?')

    expect(ApiConfig.deleteUser).toHaveBeenCalledWith(2)
    expect(toast.success).toHaveBeenCalledWith('User deleted successfully')
    expect(ApiConfig.getAllUsers).toHaveBeenCalledTimes(2) // Initial load + after delete
  })

  it('does not delete user when confirmation is cancelled', async () => {
    window.confirm.mockReturnValue(false)

    setup()

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
    })

    const deleteButton = screen.getByTestId('delete-2')
    await userEvent.click(deleteButton)

    expect(ApiConfig.deleteUser).not.toHaveBeenCalled()
  })

  it('handles error during user deletion', async () => {
    ApiConfig.deleteUser.mockRejectedValue({
      response: { data: { message: 'Cannot delete admin user' } },
    })
    window.confirm.mockReturnValue(true)

    setup()

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
    })

    const deleteButton = screen.getByTestId('delete-1')
    await userEvent.click(deleteButton)

    expect(toast.error).toHaveBeenCalledWith('Cannot delete admin user')
  })

  it('disables submitting while in progress', async () => {
    ApiConfig.createUser.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)))

    setup()

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
    })

    const createButton = screen.getByText('Create New User')
    await userEvent.click(createButton)

    const saveButton = screen.getByTestId('save-button')
    await userEvent.click(saveButton)

    await userEvent.click(saveButton)

    await waitFor(() => {
      expect(ApiConfig.createUser).toHaveBeenCalledTimes(1)
    })
  })

  it('closes modal when cancel button is clicked', async () => {
    setup()

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
    })

    const createButton = screen.getByText('Create New User')
    await userEvent.click(createButton)

    expect(screen.getByTestId('user-modal')).toBeInTheDocument()

    const cancelButton = screen.getByTestId('cancel-button')
    await userEvent.click(cancelButton)

    expect(screen.queryByTestId('user-modal')).not.toBeInTheDocument()
  })
})
