import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import api from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<Record<string, unknown> | null>(null)
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => user.value !== null)

  // Actions
  const fetchCsrfToken = async () => {
    // Sanctum's CSRF endpoint is usually at the root domain, not under /api.
    // We dynamically remove '/api' from the baseURL if it exists.
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api'
    const rootUrl = baseUrl.replace(/\/api$/, '')

    await api.get('/sanctum/csrf-cookie', { baseURL: rootUrl })
  }

  const fetchUser = async () => {
    try {
      const response = await api.get('/user')
      user.value = response.data
    } catch (err) {
      // If fetching the user fails (e.g., unauthenticated), we ensure the state is clear
      user.value = null
    }
  }

  const login = async (credentials: Record<string, string>) => {
    isLoading.value = true
    error.value = null

    try {
      // 1. Get the CSRF cookie for protection
      await fetchCsrfToken()

      // 2. Perform the actual login request (adjust the route if your Laravel route differs)
      await api.post('/login', credentials)

      // 3. Fetch the authenticated user's data
      await fetchUser()
    } catch (err) {
      // <-- ': any' hier einfach komplett entfernen!
      if (axios.isAxiosError(err)) {
        // Jetzt weiß TypeScript sicher, dass err.response existiert
        error.value = err.response?.data?.message || 'Ein Fehler ist aufgetreten.'
      } else {
        error.value = 'Ein unerwarteter Fehler ist aufgetreten.'
      }
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    isLoading.value = true
    try {
      await api.post('/logout')
    } catch (err) {
      console.error('Logout failed:', err)
    } finally {
      // Even if the API call fails, we log the user out locally
      user.value = null
      isLoading.value = false
    }
  }

  return {
    // State
    user,
    isLoading,
    error,
    // Getters
    isAuthenticated,
    // Actions
    login,
    logout,
    fetchUser,
  }
})
