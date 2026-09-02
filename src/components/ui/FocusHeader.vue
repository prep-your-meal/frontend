<template>
  <div class="relative flex justify-center items-center mb-8 z-10">
    <!-- Native-style Back Button -->
    <button
      @click="goBack"
      class="md:hidden absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-bg-cream/50 text-dark-green rounded-full border border-gray-100 shadow-sm hover:bg-primary-green hover:text-white hover:border-primary-green transition-all"
    >
      <svg class="w-6 h-6 pr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <!-- Centered Logo & Brand -->
    <button
      @click="goBack"
      class="flex flex-col items-center hover:opacity-90 transition-opacity focus:outline-none"
    >
      <img
        src="@/assets/images/prepyourmeal_logo.svg"
        alt="PrepYourMeal Logo"
        class="h-20 md:h-24 w-auto drop-shadow-sm mb-3"
      />
      <BrandName class="text-2xl text-primary-green" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import BrandName from '@/components/ui/BrandName.vue'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 2) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>
