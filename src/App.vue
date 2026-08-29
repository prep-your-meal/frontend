<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import TopNav from '@/components/layout/TopNav.vue'
import BottomNav from '@/components/layout/BottomNav.vue'

const route = useRoute()

// Central definition of public pages (Marketing/Legal)
const publicPages = ['landing', 'impressum', 'privacy', 'recipe-detail']

const showTopNav = computed(() => {
  const hiddenNavPages = ['login', 'register']
  return !hiddenNavPages.includes(route.name as string)
})

// 2. BottomNav (PWA): ONLY displayed in internal app views!
// The mobile app bar must not appear on the landing page or legal pages.
const showBottomNav = computed(() => {
  return !route.meta.guestOnly && !publicPages.includes(route.name as string)
})

// 3. Footer: Only displayed on public pages or auth pages
const showFooter = computed(() => {
  return publicPages.includes(route.name as string) || route.meta.guestOnly
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
      class="w-full mt-auto py-6 text-center text-sm text-gray-500 border-t border-gray-100 bg-white/40"
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
