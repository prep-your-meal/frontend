<template>
  <div class="md:hidden flex flex-col items-center justify-center w-full pb-6 pt-1 relative">
    <!-- PWA Native-Style Back Button (Top-Left) -->
    <!-- UI Polish: Removed vertical centering. It now sits cleanly in the top left corner. -->
    <button
      v-if="showBack"
      @click="handleBack"
      class="absolute left-0 top-0 flex items-center justify-center w-10 h-10 bg-white text-dark-green rounded-full border border-gray-100 shadow-sm active:scale-95 transition-all z-20"
      aria-label="Zurück"
    >
      <svg class="w-6 h-6 pr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
    </button>

    <!-- Centered Brand -->
    <!-- UI Polish: mt-4 pushes the logo down slightly so it doesn't collide with the back button's horizontal axis -->
    <div class="flex flex-col items-center justify-center gap-2 mt-4">
      <img
        src="@/assets/images/prepyourmeal_logo.svg"
        alt="PrepYourMeal Logo"
        class="w-20 h-20 object-contain drop-shadow-sm"
      />
      <BrandName class="text-2xl text-dark-green" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import BrandName from './BrandName.vue'

defineProps({
  showBack: {
    type: Boolean,
    default: false,
  },
})

const router = useRouter()

const handleBack = () => {
  if (window.history.length > 2) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>
