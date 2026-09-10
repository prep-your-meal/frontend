<template>
  <!-- Loading State: Shown only during the initial hard reload while verifying the token -->
  <div
    v-if="!authStore.isInitialized"
    class="min-h-screen flex items-center justify-center bg-bg-cream"
  >
    <!-- Reusing your existing LoadingSpinner component -->
    <LoadingSpinner size="h-10 w-10" color="text-primary-green" />
  </div>

  <!-- Main Application: Shown only after auth initialization is complete -->
  <div v-else class="min-h-screen flex flex-col bg-bg-cream">
    <!-- Desktop Navigation -->
    <TopNav v-if="showTopNav" />

    <!-- Main Content Area -->
    <main
      class="flex-grow flex flex-col w-full relative"
      :class="{ 'pb-20 md:pb-0': showBottomNav }"
    >
      <RouterView />
    </main>

    <!-- PWA Install Banner -->
    <PwaInstallBanner />

    <!-- Global Footer -->
    <footer
      v-if="showFooter"
      class="w-full mt-auto py-6 text-center text-sm text-gray-500 border-t border-gray-100"
      :class="!alwaysShowFooterOnMobile ? 'hidden md:block' : ''"
    >
      <div class="flex justify-center space-x-6 mb-2">
        <RouterLink
          to="/impressum"
          @click="scrollToTop"
          class="hover:text-primary-green transition-colors duration-200"
        >
          {{ $t('footer.impressum') }}
        </RouterLink>
        <RouterLink
          to="/privacy"
          @click="scrollToTop"
          class="hover:text-primary-green transition-colors duration-200"
        >
          {{ $t('footer.privacy') }}
        </RouterLink>
      </div>
      <p>&copy; {{ new Date().getFullYear() }} PrepYourMeal. {{ $t('footer.rights') }}</p>
    </footer>

    <!-- Mobile Navigation (PWA Tab-Bar) -->
    <BottomNav v-if="showBottomNav" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth' // <-- IMPORT AUTH STORE
import TopNav from '@/components/layout/TopNav.vue'
import BottomNav from '@/components/layout/BottomNav.vue'
import PwaInstallBanner from '@/components/ui/PwaInstallBanner.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue' // <-- IMPORT SPINNER

const route = useRoute()
const authStore = useAuthStore() // <-- INITIALIZE STORE

const showTopNav = computed(() => {
  return !route.meta.hideTopNav
})

const showBottomNav = computed(() => {
  return !route.meta.hideBottomNav && route.name !== 'landing'
})

const showFooter = computed(() => {
  return true
})

const alwaysShowFooterOnMobile = computed(() => {
  return route.name === 'landing'
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}
</script>
