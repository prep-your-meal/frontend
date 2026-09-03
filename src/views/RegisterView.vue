<template>
  <div class="flex flex-col items-center justify-center w-full md:px-4 py-8 flex-grow">
    <!-- Register/Beta Container (Edge-to-Edge on Mobile, Card on Desktop) -->
    <div
      class="w-full max-w-md md:bg-white px-4 md:px-8 py-4 md:py-10 md:rounded-3xl md:shadow-sm md:border-t-[8px] border-t-transparent md:border-primary-green relative text-center"
    >
      <!-- Unified Header -->
      <FocusHeader />

      <!-- Header -->
      <h1 class="text-2xl md:text-3xl font-extrabold text-dark-green mb-4">
        {{ $t('register.title') }}
      </h1>

      <!-- Lock Icon (Accent Gold) -->
      <div class="flex justify-center mb-6">
        <div
          class="flex items-center justify-center w-16 h-16 rounded-full bg-accent-gold/10 text-accent-gold"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            ></path>
          </svg>
        </div>
      </div>

      <!-- Beta Info Text -->
      <p class="text-gray-600 mb-8 leading-relaxed">
        {{ $t('register.thanks') }}
      </p>

      <!-- Email Action Button -->
      <a
        href="mailto:hello@prepyourmeal.de?subject=Teilnahme%20Closed-Beta"
        class="inline-flex justify-center items-center w-full bg-primary-green text-white font-bold text-lg py-3.5 px-4 rounded-2xl hover:bg-dark-green hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ring-4 ring-primary-green/20 mb-8"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          ></path>
        </svg>
        hello@prepyourmeal.de
      </a>

      <!-- Back Link to Login -->
      <div class="border-t border-gray-200 md:border-gray-100 pt-6">
        <RouterLink
          to="/login"
          class="text-primary-green font-medium hover:text-accent-gold transition-colors"
        >
          {{ $t('register.back_to_login') }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FocusHeader from '@/components/ui/FocusHeader.vue'
</script>
