<template>
  <!-- Hidden on mobile (hidden), visible on tablet/desktop (md:block) -->
  <header
    class="hidden md:block sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm"
  >
    <!-- Fixed height (h-16) ensures child elements can properly inherit 100% height -->
    <div class="max-w-6xl w-full mx-auto px-4 flex items-center justify-between h-16">
      <!-- Brand Logo -->
      <RouterLink to="/" class="flex items-center hover:opacity-90 transition-opacity">
        <img
          src="@/assets/images/prepyourmeal_logo.png"
          alt="PrepYourMeal Logo"
          class="h-10 w-auto"
        />
        <span class="ml-2 font-bold text-dark-green tracking-wide lowercase">prepyourmeal</span>
      </RouterLink>

      <!-- App Navigation Links (Only visible if the user is authenticated) -->
      <nav v-if="authStore.isAuthenticated" class="flex space-x-8 h-full">
        <!-- 'inline-flex items-center h-full' perfectly centers the text internally -->
        <RouterLink
          to="/"
          class="inline-flex items-center h-full px-1 text-sm font-medium text-gray-500 hover:text-primary-green transition-colors border-b-2 border-transparent"
          active-class="!text-primary-green border-primary-green"
          exact
        >
          {{ $t('nav.discover') }}
        </RouterLink>
        <RouterLink
          to="/dashboard"
          class="inline-flex items-center h-full px-1 text-sm font-medium text-gray-500 hover:text-primary-green transition-colors border-b-2 border-transparent"
          active-class="!text-primary-green border-primary-green"
        >
          {{ $t('nav.plan') }}
        </RouterLink>
        <RouterLink
          to="/shopping"
          class="inline-flex items-center h-full px-1 text-sm font-medium text-gray-500 hover:text-primary-green transition-colors border-b-2 border-transparent"
          active-class="!text-primary-green border-primary-green"
        >
          {{ $t('nav.shopping') }}
        </RouterLink>
        <RouterLink
          to="/profile"
          class="inline-flex items-center h-full px-1 text-sm font-medium text-gray-500 hover:text-primary-green transition-colors border-b-2 border-transparent"
          active-class="!text-primary-green border-primary-green"
        >
          {{ $t('nav.profile') }}
        </RouterLink>
      </nav>

      <!-- Guest Actions (Only visible if the user is NOT authenticated) -->
      <div v-else class="flex items-center space-x-6">
        <RouterLink
          to="/login"
          class="text-sm font-medium text-dark-green hover:text-primary-green transition-colors"
        >
          {{ $t('nav.login', 'Login') }}
        </RouterLink>
        <RouterLink
          to="/register"
          class="text-sm font-bold text-white bg-primary-green px-5 py-2.5 rounded-xl hover:bg-accent-gold transition-colors shadow-sm"
        >
          {{ $t('nav.register', 'Registrieren') }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// Import the auth store to check the user's login status
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>
