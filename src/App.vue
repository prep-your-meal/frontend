<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import TopNav from '@/components/layout/TopNav.vue'
import BottomNav from '@/components/layout/BottomNav.vue'

const route = useRoute()

// Computed property to decide when to show the main app navigation.
// We hide it on guestOnly pages (like login/register) so the user focuses on the form.
const showAppNav = computed(() => {
  return !route.meta.guestOnly
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-bg-cream">
    <!-- Desktop Navigation (hidden on mobile) -->
    <TopNav v-if="showAppNav" />

    <!-- Main Content Area -->
    <!-- pb-20 adds bottom padding on mobile so the content isn't hidden behind the fixed BottomNav -->
    <main class="flex-grow flex flex-col w-full relative" :class="{ 'pb-20 md:pb-0': showAppNav }">
      <!-- The dynamic placeholder for views (LandingView, LoginView, DashboardView, etc.) -->
      <RouterView />
    </main>

    <!-- Global Footer -->
    <!-- We hide the footer on logged-in app views if desired, but keep it on marketing pages. -->
    <footer
      v-if="!showAppNav || route.name === 'landing'"
      class="w-full mt-12 py-8 text-center text-sm text-gray-500 border-t border-gray-100"
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

    <!-- Mobile Navigation (hidden on desktop) -->
    <BottomNav v-if="showAppNav" />
  </div>
</template>

<style scoped></style>
