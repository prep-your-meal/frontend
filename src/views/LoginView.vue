<template>
  <div class="flex flex-col items-center justify-center w-full md:px-4 py-8 flex-grow">
    <!-- Login Container -->
    <div
      class="w-full max-w-md md:bg-white px-4 md:px-8 py-4 md:py-10 md:rounded-3xl md:shadow-sm md:border-t-[8px] border-t-transparent md:border-primary-green relative"
    >
      <FocusHeader />

      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-2xl md:text-3xl font-extrabold text-dark-green mb-2">
          {{ $t('login.title', 'Welcome back') }}
        </h1>
        <p class="text-gray-500">
          {{ $t('login.subtitle', 'Log in to plan your meal preps.') }}
        </p>
      </div>

      <!-- Success Message Banner (For Email Verification) -->
      <div
        v-if="successMessage"
        class="mb-6 p-4 rounded-xl bg-primary-green/10 border border-primary-green/30 text-primary-green text-sm text-center font-medium shadow-sm flex items-center justify-center gap-3"
      >
        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span class="text-left leading-snug">{{ successMessage }}</span>
      </div>

      <!-- Error Message Banner (Secondary-Rust) -->
      <div
        v-if="errorMessage"
        class="mb-6 p-4 rounded-xl bg-secondary-rust/10 border border-secondary-rust/30 text-secondary-rust text-sm text-center font-medium shadow-sm flex items-center justify-center gap-3"
      >
        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span class="text-left leading-snug">{{ errorMessage }}</span>
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
            class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white md:bg-bg-cream/30 text-dark-green shadow-sm md:shadow-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-green/50 focus:border-primary-green transition-all"
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
            class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white md:bg-bg-cream/30 text-dark-green shadow-sm md:shadow-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-green/50 focus:border-primary-green transition-all"
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
          <LoadingSpinner v-if="isLoading" size="h-5 w-5" color="text-white" class="-ml-1 mr-3" />
          {{ isLoading ? $t('login.loading', 'Loading...') : $t('login.submit', 'Log In') }}
        </button>
      </form>

      <!-- Divider -->
      <div class="mt-8 relative flex items-center justify-center">
        <div class="absolute inset-x-0 h-px bg-gray-200 md:bg-gray-100"></div>
        <span class="relative bg-bg-cream md:bg-white px-4 text-sm text-gray-500 md:text-gray-400">
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
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import FocusHeader from '@/components/ui/FocusHeader.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { t } = useI18n()

onMounted(() => {
  // Check if the user was just redirected from a successful email verification
  if (route.query.verified === '1') {
    successMessage.value = t('auth.verified_success')
    // Clean up the URL so the parameter doesn't persist on reload
    router.replace({ query: {} })
  }
})

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = '' // Clear success message on new login attempt

  try {
    await authStore.login({
      email: email.value,
      password: password.value,
    })

    router.push('/dashboard')
  } catch (error: unknown) {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 403 &&
      error.response.data?.needs_verification
    ) {
      errorMessage.value = t('auth.needs_verification')
    } else {
      errorMessage.value = authStore.error || t('auth.error_occurred')
    }
  } finally {
    isLoading.value = false
  }
}
</script>
