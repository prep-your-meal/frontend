<template>
  <header
    class="hidden md:block fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out"
    :class="[
      isLandingAndAtTop
        ? 'opacity-0 -translate-y-full pointer-events-none bg-transparent shadow-none'
        : 'opacity-100 translate-y-0 bg-white border-b border-gray-100 shadow-sm',
    ]"
  >
    <div class="max-w-6xl w-full mx-auto px-4 flex items-center justify-between h-24">
      <!-- Left side: Brand Logo -->
      <RouterLink to="/" class="flex items-center hover:opacity-90 transition-opacity">
        <img
          src="@/assets/images/prepyourmeal_logo.svg"
          alt="PrepYourMeal Logo"
          class="h-20 w-auto drop-shadow-sm"
        />
        <BrandName class="ml-4 text-2xl" />
      </RouterLink>

      <!-- Right side: Navigation & Auth Actions -->
      <div class="flex items-center h-full">
        <!-- App Navigation Links (Mixed visibility) -->
        <nav class="flex space-x-8 h-full">
          <!-- 1. Discover -->

          <RouterLink
            to="/recipes"
            class="inline-flex items-center h-full px-1 text-sm font-medium text-dark-green hover:text-primary-green transition-colors border-b-2 border-transparent"
            active-class="!text-primary-green border-primary-green"
          >
            {{ $t('nav.discover') }}
          </RouterLink>

          <!-- 2. Auth-Only Links (Planner, Shopping, Profile) -->
          <template v-if="authStore.isAuthenticated">
            <RouterLink
              to="/dashboard"
              class="inline-flex items-center h-full px-1 text-sm font-medium text-dark-green hover:text-primary-green transition-colors border-b-2 border-transparent"
              active-class="!text-primary-green border-primary-green"
            >
              {{ $t('nav.plan') }}
            </RouterLink>
            <RouterLink
              to="/shopping"
              class="inline-flex items-center h-full px-1 text-sm font-medium text-dark-green hover:text-primary-green transition-colors border-b-2 border-transparent"
              active-class="!text-primary-green border-primary-green"
            >
              {{ $t('nav.shopping') }}
            </RouterLink>
            <RouterLink
              to="/profile"
              class="inline-flex items-center h-full px-1 text-sm font-medium text-dark-green hover:text-primary-green transition-colors border-b-2 border-transparent"
              active-class="!text-primary-green border-primary-green"
            >
              {{ $t('nav.profile') }}
            </RouterLink>
          </template>
        </nav>

        <!-- Guest Actions (Login/Register) -->
        <div
          v-if="!authStore.isAuthenticated"
          class="flex items-center space-x-6 ml-8 pl-8 border-l border-gray-100 h-8"
        >
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
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BrandName from '@/components/ui/BrandName.vue'

const authStore = useAuthStore()
const route = useRoute()

const isScrolled = ref(false)

const isLandingAndAtTop = computed(() => {
  return route.name === 'landing' && !isScrolled.value
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50 || document.documentElement.scrollTop > 50
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
