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
          class="h-14 w-auto drop-shadow-sm"
        />
        <BrandName class="ml-4 text-2xl" />
      </RouterLink>

      <!-- Right side: Navigation & Auth Actions -->
      <div class="flex items-center h-full">
        <!-- App Navigation Links -->
        <nav class="flex space-x-8 h-full">
          <!-- 1. Discover -->
          <RouterLink
            to="/recipes"
            class="inline-flex items-center h-full px-1 text-sm font-medium text-dark-green hover:text-primary-green transition-colors border-b-2 border-transparent"
            active-class="!text-primary-green border-primary-green"
          >
            {{ $t('nav.discover', 'Entdecken') }}
          </RouterLink>

          <!-- 2. Planner (Visible to everyone) -->
          <RouterLink
            to="/planner"
            class="inline-flex items-center h-full px-1 text-sm font-medium text-dark-green hover:text-primary-green transition-colors border-b-2 border-transparent"
            active-class="!text-primary-green border-primary-green"
          >
            {{ $t('nav.plan', 'Planer') }}
          </RouterLink>

          <!-- 3. Dashboard (ONLY visible if authenticated) -->
          <RouterLink
            v-if="authStore.isAuthenticated"
            to="/dashboard"
            class="inline-flex items-center h-full px-1 text-sm font-medium text-dark-green hover:text-primary-green transition-colors border-b-2 border-transparent"
            active-class="!text-primary-green border-primary-green"
          >
            {{ $t('nav.dashboard', 'Dashboard') }}
          </RouterLink>

          <!-- 4. Shopping -->
          <RouterLink
            to="/shopping"
            class="inline-flex items-center h-full px-1 text-sm font-medium text-dark-green hover:text-primary-green transition-colors border-b-2 border-transparent"
            active-class="!text-primary-green border-primary-green"
          >
            {{ $t('nav.shopping', 'Einkauf') }}
          </RouterLink>
        </nav>

        <!-- Right Side Auth Actions (Visually separated by border-l) -->
        <div class="flex items-center space-x-6 ml-8 pl-8 border-l border-gray-200 h-8">
          <!-- Guest State: Login / Register -->
          <template v-if="!authStore.isAuthenticated">
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
          </template>

          <!-- Authenticated State: Profile / Logout -->
          <template v-else>
            <RouterLink
              to="/profile"
              class="text-sm font-medium text-dark-green hover:text-primary-green transition-colors"
            >
              {{ $t('nav.profile', 'Profil') }}
            </RouterLink>
            <button
              @click="handleLogout"
              class="text-sm font-bold text-secondary-rust bg-white border border-secondary-rust/30 px-5 py-2.5 rounded-xl hover:bg-secondary-rust hover:text-white transition-all shadow-sm"
            >
              {{ $t('nav.logout', 'Abmelden') }}
            </button>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BrandName from '@/components/ui/BrandName.vue'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const isScrolled = ref(false)

const isLandingAndAtTop = computed(() => {
  return route.name === 'landing' && !isScrolled.value
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50 || document.documentElement.scrollTop > 50
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
