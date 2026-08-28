<template>
  <!--
    Dynamic Classes:
    - Always 'fixed' to overlay the video
    - If on landing page AND not scrolled down, it hides (opacity-0, -translate-y-full)
    - Otherwise, it slides in smoothly
  -->
  <header
    class="hidden md:block fixed top-0 z-50 w-full transition-all duration-500 ease-in-out shadow-sm"
    :class="[
      isLandingAndAtTop
        ? 'opacity-0 -translate-y-full pointer-events-none bg-transparent'
        : 'opacity-100 translate-y-0 bg-white border-b border-gray-100',
    ]"
  >
    <div class="max-w-6xl w-full mx-auto px-4 flex items-center justify-between h-20">
      <!-- Brand Logo -->
      <RouterLink to="/" class="flex items-center hover:opacity-90 transition-opacity">
        <img
          src="@/assets/images/prepyourmeal_logo.png"
          alt="PrepYourMeal Logo"
          class="h-14 w-auto"
        />
        <BrandName class="ml-2" />
      </RouterLink>

      <!-- App Navigation Links (Only visible if the user is authenticated) -->
      <nav v-if="authStore.isAuthenticated" class="flex space-x-8 h-full">
        <RouterLink
          to="/"
          class="inline-flex items-center h-full px-1 text-sm font-medium text-gray-500 hover:text-primary-green transition-colors border-b-2 border-transparent"
          active-class="!text-primary-green border-primary-green"
          exact
        >
          {{ $t('nav.discover', 'Entdecken') }}
        </RouterLink>
        <RouterLink
          to="/dashboard"
          class="inline-flex items-center h-full px-1 text-sm font-medium text-gray-500 hover:text-primary-green transition-colors border-b-2 border-transparent"
          active-class="!text-primary-green border-primary-green"
        >
          {{ $t('nav.plan', 'Planer') }}
        </RouterLink>
        <RouterLink
          to="/shopping"
          class="inline-flex items-center h-full px-1 text-sm font-medium text-gray-500 hover:text-primary-green transition-colors border-b-2 border-transparent"
          active-class="!text-primary-green border-primary-green"
        >
          {{ $t('nav.shopping', 'Einkauf') }}
        </RouterLink>
        <RouterLink
          to="/profile"
          class="inline-flex items-center h-full px-1 text-sm font-medium text-gray-500 hover:text-primary-green transition-colors border-b-2 border-transparent"
          active-class="!text-primary-green border-primary-green"
        >
          {{ $t('nav.profile', 'Profil') }}
        </RouterLink>
      </nav>

      <!-- Guest Actions -->
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BrandName from '@/components/ui/BrandName.vue'

const authStore = useAuthStore()
const route = useRoute()

// Scroll Logic
const isScrolled = ref(false)

// Check if we are on the landing page AND haven't scrolled down yet
const isLandingAndAtTop = computed(() => {
  return route.name === 'landing' && !isScrolled.value
})

const handleScroll = () => {
  // If we scroll down more than 50px, trigger the navbar
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
