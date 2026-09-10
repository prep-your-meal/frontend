<template>
  <div>
    <!-- Backdrop Overlay for Flyout Menu -->
    <Transition name="fade">
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 bg-black/30 z-40 md:hidden backdrop-blur-sm"
        @click="isMenuOpen = false"
      ></div>
    </Transition>

    <!-- Flyout Menu (Drawer) -->
    <Transition name="slide-up">
      <div
        v-if="isMenuOpen"
        class="fixed bottom-16 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-40 md:hidden pb-6 pt-3 px-6 flex flex-col"
      >
        <!-- Pull Handle Indicator -->
        <div class="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>

        <!-- Flyout Navigation Items -->
        <RouterLink
          v-if="authStore.isAuthenticated"
          to="/profile"
          @click="isMenuOpen = false"
          class="py-4 border-b border-gray-100 text-dark-green font-medium"
        >
          {{ $t('nav.profile', 'Profil') }}
        </RouterLink>

        <RouterLink
          to="/impressum"
          @click="isMenuOpen = false"
          class="py-4 border-b border-gray-100 text-dark-green"
        >
          {{ $t('nav.impressum', 'Impressum') }}
        </RouterLink>

        <RouterLink
          to="/privacy"
          @click="isMenuOpen = false"
          class="py-4 border-b border-gray-100 text-dark-green"
        >
          {{ $t('nav.privacy', 'Datenschutz') }}
        </RouterLink>

        <!-- Logout Action inside Flyout -->
        <button
          v-if="authStore.isAuthenticated"
          @click="handleLogout"
          class="py-4 text-secondary-rust font-bold text-left w-full mt-2 hover:opacity-80 transition-opacity"
        >
          {{ $t('nav.logout', 'Abmelden') }}
        </button>
      </div>
    </Transition>

    <!-- Bottom Navigation Bar -->
    <nav
      class="flex md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 pb-[env(safe-area-inset-bottom)]"
    >
      <div class="flex justify-around items-center h-16 w-full px-2">
        <!-- 1. Discover -->
        <RouterLink
          to="/recipes"
          class="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-primary-green transition-colors"
          active-class="text-primary-green font-medium"
        >
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span class="text-[10px] uppercase tracking-wider">{{
            $t('nav.discover', 'Entdecken')
          }}</span>
        </RouterLink>

        <!-- 2. Planner -->
        <RouterLink
          to="/planner"
          class="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-primary-green transition-colors"
          active-class="text-primary-green font-medium"
        >
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          <span class="text-[10px] uppercase tracking-wider">{{ $t('nav.plan', 'Planer') }}</span>
        </RouterLink>

        <!-- 3. Dashboard (Conditionally rendered) -->
        <RouterLink
          v-if="authStore.isAuthenticated"
          to="/dashboard"
          class="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-primary-green transition-colors"
          active-class="text-primary-green font-medium"
        >
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>
          <span class="text-[10px] uppercase tracking-wider">{{
            $t('nav.dashboard', 'Home')
          }}</span>
        </RouterLink>

        <!-- 4. Shopping list -->
        <RouterLink
          to="/shopping"
          class="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-primary-green transition-colors"
          active-class="text-primary-green font-medium"
        >
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
          <span class="text-[10px] uppercase tracking-wider">{{
            $t('nav.shopping', 'Einkauf')
          }}</span>
        </RouterLink>

        <!-- 5. Hamburger Menu Button -->
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-primary-green transition-colors"
          :class="{ 'text-primary-green': isMenuOpen }"
        >
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
          <span class="text-[10px] uppercase tracking-wider">{{ $t('nav.menu', 'Menü') }}</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

// State to manage the flyout menu visibility
const isMenuOpen = ref(false)

const handleLogout = async () => {
  isMenuOpen.value = false // Close the flyout
  await authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
/* Transitions for the flyout and backdrop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
