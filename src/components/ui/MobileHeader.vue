<template>
  <div class="md:hidden flex flex-col items-center justify-center w-full pb-6 relative">
    <button
      v-if="showBack"
      @click="handleBack"
      class="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-green p-2 transition-colors"
      aria-label="Zurück"
    >
      <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
    </button>

    <div class="flex flex-col items-center justify-center gap-1 mt-2">
      <!-- UI Polish: Increased logo size from h-8 to h-12 for better brand visibility -->
      <img
        src="@/assets/images/prepyourmeal_logo.svg"
        alt="PrepYourMeal Logo"
        class="h-12 w-auto drop-shadow-sm"
      />
      <!-- UI Polish: Increased brand name size to match new logo scale -->
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
