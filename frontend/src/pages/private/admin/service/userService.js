import ApiConfig from '../../../../api/ApiConfig'

const userService = {
  fetchUsers: async () => {
    return await ApiConfig.getAllUsers()
  },

  createUser: async (userData) => {
    return await ApiConfig.adminUserCreation(userData)
  },

  updateUser: async (id, userData) => {
    return await ApiConfig.updateUser(id, userData)
  },

  toggleUserStatus: async (id) => {
    return await ApiConfig.toggleUserStatus(id)
  },

  deleteUser: async (id) => {
    return await ApiConfig.deleteUser(id)
  },
}

export default userService
