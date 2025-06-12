import ApiConfig from '../api/ApiConfig'
export const statsService = {
  fetchUserStats: async () => {
    return await ApiConfig.getUserStats()
  },
  fetchEventStats: async () => {
    return await ApiConfig.getEventStats()
  },
  fetchLoanStats: async () => {
    return await ApiConfig.getLoanStats()
  },
}
