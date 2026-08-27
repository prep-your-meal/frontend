<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- The RouterView is the dynamic placeholder. 
       Depending on the URL, Vue Router will inject the LandingView, LoginView, or DashboardView here. -->
  <RouterView />
  <!-- Footer Section -->
  <footer class="w-full mt-12 py-8 text-center text-sm text-gray-500 border-t border-gray-100">
    <div class="flex justify-center space-x-6 mb-2">
      <!-- Legal Notice Link -->
      <RouterLink to="/impressum" class="hover:text-primary-green transition-colors duration-200">
        {{ $t('footer.impressum') }}
      </RouterLink>

      <!-- Privacy Policy Link -->
      <RouterLink to="/privacy" class="hover:text-primary-green transition-colors duration-200">
        {{ $t('footer.privacy') }}
      </RouterLink>
    </div>

    <p>&copy; {{ new Date().getFullYear() }} PrepYourMeal. {{ $t('footer.rights') }}</p>
  </footer>
</template>

<style scoped></style>
