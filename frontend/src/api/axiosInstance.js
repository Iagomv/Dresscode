import axios from 'axios'
import { TOKEN_KEY } from '../constants/textConstants'

const axiosInstance = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY)

    const isPublic = config.url.includes('/auth') || config.url.includes('/auth')

    if (token && !isPublic) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

export default axiosInstance
