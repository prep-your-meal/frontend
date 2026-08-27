import axios from 'axios'

const api = axios.create({
  // Pulls the URL from the .env file. Falls back to localhost if missing.
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  // Absolutely essential for Laravel Sanctum Auth (allows setting cookies)!
  withCredentials: true,
  withXSRFToken: true,
})

// Global interceptor that monitors all responses from the backend
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the API throws a 401 Unauthorized error
    if (error.response?.status === 401) {
      console.warn('Unauthorized. The session is invalid or has expired.')
      // We can add an automatic redirect to the login page here later
    }
    return Promise.reject(error)
  },
)

export default api
