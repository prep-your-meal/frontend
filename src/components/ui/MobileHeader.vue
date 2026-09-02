<template>
  <div class="md:hidden flex flex-col items-center justify-center w-full pb-6 relative">
    <!-- Optional: Wenn eine Zurück-Aktion gewünscht ist (wie in der Detailansicht) -->
    <button
      v-if="showBack"
      @click="handleBack"
      class="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-green p-2"
      aria-label="Zurück"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
    </button>

    <div class="flex items-center justify-center">
      <img
        src="@/assets/images/prepyourmeal_logo.svg"
        alt="PrepYourMeal Logo"
        class="h-8 w-auto mr-2 drop-shadow-sm"
      />
      <BrandName class="text-xl text-dark-green" />
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
