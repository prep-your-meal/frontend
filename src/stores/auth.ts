import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import api from '@/services/api'
import i18n from '@/i18n' // Import the i18n instance for translation

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<Record<string, unknown> | null>(null)
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // Tracks if the app has checked local storage for an existing session on initial load
  const isInitialized = ref<boolean>(false)

  // Getters
  const isAuthenticated = computed(() => user.value !== null)

  // Actions
  const fetchUser = async () => {
    try {
      const response = await api.get('/user')
      // The backend returns a JSend formatted response: { status: 'success', data: { ...user } }
      user.value = response.data.data
    } catch {
      // If fetching the user fails (e.g., unauthenticated or invalid token), ensure the state is clear
      user.value = null
      localStorage.removeItem('auth_token')
    }
  }

  // Function to restore the session upon page reload
  const initializeAuth = async () => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      // If a token exists in storage, silently fetch the user data before the router redirects
      await fetchUser()
    }
    isInitialized.value = true
  }

  const login = async (credentials: Record<string, string>) => {
    isLoading.value = true
    error.value = null

    try {
      // 1. Perform the stateless login request directly
      const response = await api.post('/auth/login', credentials)

      // 2. Extract the token from the backend response
      const token = response.data.token

      // 3. Save the token to localStorage so the Axios interceptor can attach it to future requests
      localStorage.setItem('auth_token', token)

      // 4. Fetch the authenticated user's data
      await fetchUser()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Handle explicit 401 Unauthorized errors gracefully
        if (err.response?.status === 401) {
          error.value = i18n.global.t('auth.invalid_credentials', 'Invalid email or password.')
        } else {
          error.value =
            err.response?.data?.message ||
            i18n.global.t('auth.error_occurred', 'An error occurred during login.')
        }
      } else {
        error.value = i18n.global.t('auth.unexpected_error', 'An unexpected error occurred.')
      }
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    isLoading.value = true
    try {
      // Send logout request to invalidate the token on the server
      await api.post('/auth/logout')
    } catch (err) {
      console.error('Logout failed on the server:', err)
    } finally {
      // Always clean up local state and storage, even if the API call fails or network drops
      localStorage.removeItem('auth_token')
      user.value = null
      isLoading.value = false
    }
  }

  return {
    // State
    user,
    isLoading,
    error,
    isInitialized,
    // Getters
    isAuthenticated,
    // Actions
    login,
    logout,
    fetchUser,
    initializeAuth,
  }
})
