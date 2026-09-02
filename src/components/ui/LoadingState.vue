<template>
  <div class="flex flex-col justify-center items-center w-full" :class="containerClass">
    <LoadingSpinner :size="spinnerSize" :color="spinnerColor" :class="text ? 'mb-4' : ''" />
    <p v-if="text" class="font-medium animate-pulse" :class="textColor">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
import LoadingSpinner from './LoadingSpinner.vue'

defineProps({
  text: { type: String, default: '' },
  spinnerSize: { type: String, default: 'h-10 w-10' },
  spinnerColor: { type: String, default: 'text-primary-green' },
  textColor: { type: String, default: 'text-dark-green/50' },
  containerClass: { type: String, default: 'py-24' },
})
</script>
