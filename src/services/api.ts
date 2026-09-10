import axios from 'axios'
import i18n from '../i18n'

const api = axios.create({
  // Pulls the URL from the .env file. Falls back to localhost if missing.
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  // REMOVED: withCredentials and withXSRFToken since we are transitioning
  // to a stateless Bearer token architecture (OAuth2 ready).
})

// Request interceptor to attach global headers and the Bearer token
api.interceptors.request.use((config) => {
  const currentLocale = i18n.global.locale.value
  config.headers['Accept-Language'] = currentLocale

  // Retrieve the token from localStorage and attach it to the Authorization header
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Global interceptor that monitors all responses from the backend
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the API throws a 401 Unauthorized error
    if (error.response?.status === 401) {
      console.warn('Unauthorized. The session or token is invalid or has expired.')
      // Clear the invalid token from storage to prevent infinite loops
      localStorage.removeItem('auth_token')
      // We can add an automatic redirect to the login page here later
    }
    return Promise.reject(error)
  },
)

export default api
