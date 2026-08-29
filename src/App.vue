<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import TopNav from '@/components/layout/TopNav.vue'
import BottomNav from '@/components/layout/BottomNav.vue'

const route = useRoute()

// 1. TopNav: Visible everywhere except on pure auth pages
const showTopNav = computed(() => {
  const hiddenNavPages = ['login', 'register']
  return !hiddenNavPages.includes(route.name as string)
})

// 2. BottomNav (PWA): Visible on mobile except for landing and auth pages
const showBottomNav = computed(() => {
  const hiddenBottomNavPages = ['landing', 'login', 'register']
  return !hiddenBottomNavPages.includes(route.name as string)
})

// 3. Footer: Rendered everywhere in the DOM.
const showFooter = computed(() => {
  return true
})

// 4. Mobile Footer Display logic:
// Show the footer on mobile ONLY on the landing page.
// For all other pages (impressum, privacy, auth, app views), hide it on mobile to favor the PWA BottomNav.
const alwaysShowFooterOnMobile = computed(() => {
  return route.name === 'landing'
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-bg-cream">
    <!-- Desktop Navigation -->
    <TopNav v-if="showTopNav" />

    <!-- Main Content Area -->
    <main
      class="flex-grow flex flex-col w-full relative"
      :class="{ 'pb-20 md:pb-0': showBottomNav }"
    >
      <RouterView />
    </main>

    <!-- Global Footer -->
    <footer
      v-if="showFooter"
      class="w-full mt-auto py-6 text-center text-sm text-gray-500 border-t border-gray-100"
      :class="!alwaysShowFooterOnMobile ? 'hidden md:block' : ''"
    >
      <div class="flex justify-center space-x-6 mb-2">
        <RouterLink to="/impressum" class="hover:text-primary-green transition-colors duration-200">
          {{ $t('footer.impressum') }}
        </RouterLink>
        <RouterLink to="/privacy" class="hover:text-primary-green transition-colors duration-200">
          {{ $t('footer.privacy') }}
        </RouterLink>
      </div>
      <p>&copy; {{ new Date().getFullYear() }} PrepYourMeal. {{ $t('footer.rights') }}</p>
    </footer>

    <!-- Mobile Navigation (PWA Tab-Bar) -->
    <BottomNav v-if="showBottomNav" />
  </div>
</template>
