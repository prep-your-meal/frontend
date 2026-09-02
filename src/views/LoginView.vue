<template>
  <div class="flex flex-col items-center justify-center w-full px-4 py-8 flex-grow">
    <!-- Login Card -->
    <div
      class="w-full max-w-md bg-white px-8 py-10 rounded-3xl shadow-sm border-t-[8px] border-primary-green relative"
    >
      <!-- Logo & name as backlink to home -->
      <!-- Unified Header with integrated Back Button -->
      <div class="relative flex justify-center items-center mb-8 z-10">
        <!-- Native-style Back Button -->
        <button
          @click="goBack"
          class="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-bg-cream/50 text-dark-green rounded-full border border-gray-100 shadow-sm hover:bg-primary-green hover:text-white hover:border-primary-green transition-all"
          :aria-label="$t('login.back', 'Zurück')"
        >
          <svg class="w-6 h-6 pr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <!-- Centered Logo & Brand -->
        <div class="flex flex-col items-center">
          <img
            src="@/assets/images/prepyourmeal_logo.svg"
            alt="PrepYourMeal Logo"
            class="h-16 w-auto drop-shadow-sm mb-2"
          />
          <BrandName class="text-xl text-primary-green" />
        </div>
      </div>

      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-2xl md:text-3xl font-extrabold text-dark-green mb-2">
          {{ $t('login.title', 'Welcome back') }}
        </h1>
        <p class="text-gray-500">
          {{ $t('login.subtitle', 'Log in to plan your meal preps.') }}
        </p>
      </div>

      <!-- Error Message Banner -->
      <div
        v-if="errorMessage"
        class="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center font-medium"
      >
        {{ errorMessage }}
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Email Input -->
        <div>
          <label for="email" class="block text-sm font-medium text-dark-green mb-1.5">
            {{ $t('login.email', 'Email Address') }}
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-bg-cream/30 text-dark-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-green/50 focus:border-primary-green transition-all"
            :placeholder="$t('login.email_placeholder', { at: '@' })"
          />
        </div>

        <!-- Password Input -->
        <div>
          <label for="password" class="block text-sm font-medium text-dark-green mb-1.5">
            {{ $t('login.password', 'Password') }}
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-bg-cream/30 text-dark-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-green/50 focus:border-primary-green transition-all"
            placeholder="••••••••"
          />

          <!-- Forgot Password Link -->
          <div class="flex justify-end mt-2">
            <a href="#" class="text-sm text-primary-green hover:text-accent-gold transition-colors">
              {{ $t('login.forgot_password', 'Forgot password?') }}
            </a>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full flex justify-center items-center bg-primary-green text-white font-bold text-lg py-3.5 px-4 rounded-2xl hover:bg-accent-gold hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ring-4 ring-primary-green/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none"
        >
          <!-- Loading Spinner -->
          <LoadingSpinner v-if="isLoading" size="h-5 w-5" color="text-white" class="-ml-1 mr-3" />
          {{ isLoading ? $t('login.loading', 'Loading...') : $t('login.submit', 'Log In') }}
        </button>
      </form>

      <!-- Divider -->
      <div class="mt-8 relative flex items-center justify-center">
        <div class="absolute inset-x-0 h-px bg-gray-100"></div>
        <span class="relative bg-white px-4 text-sm text-gray-400">
          {{ $t('login.no_account', "Don't have an account yet?") }}
        </span>
      </div>

      <!-- Register Link -->
      <div class="mt-6 text-center">
        <RouterLink
          to="/register"
          class="text-dark-green font-medium hover:text-primary-green transition-colors"
        >
          {{ $t('login.register', 'Register for free now') }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'
import BrandName from '@/components/ui/BrandName.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import axios from 'axios'

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const router = useRouter()

const goBack = () => {
  if (window.history.length > 2) {
    router.back()
  } else {
    router.push('/')
  }
}

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    // 1. Request CSRF cookie required by Laravel Sanctum SPA authentication
    await api.get('/sanctum/csrf-cookie', { baseURL: import.meta.env.VITE_APP_URL })

    // 2. Perform the actual login request using your configured Axios client
    const response = await api.post('/auth/login', {
      email: email.value,
      password: password.value,
    })

    console.log('Login successful:', response.data)
    router.push('/dashboard')
  } catch (error: unknown) {
    // Safely check if the error is an Axios error to satisfy TypeScript
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        errorMessage.value = 'Invalid email or password.'
      } else {
        errorMessage.value = 'An error occurred during login. Please try again.'
      }
    } else {
      // Fallback for native JS errors or network drops
      errorMessage.value = 'An unexpected error occurred.'
    }
    console.error('Login Error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>
